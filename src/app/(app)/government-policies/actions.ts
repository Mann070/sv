'use server';

import {
  getPolicySuggestions,
  type PolicySuggestionInput,
} from '@/ai/flows/government-policy-flow';
import { z } from 'zod';


const PolicySuggestionSchema = z.object({
  policyName: z.string().describe("The official name of the government policy."),
  description: z.string().describe("A brief description of the policy."),
  isEligible: z.boolean().describe("Whether the user is likely eligible for this policy based on the provided details."),
  eligibilityReason: z.string().describe("A clear, concise explanation of why the user is or is not eligible for this policy, referencing their specific data (e.g., 'Eligible because income is below the threshold for this scheme.' or 'Not eligible because this scheme is only for residents of Kerala.')."),
  bonds: z.array(z.string()).optional().describe("A list of key benefits, requirements, or commitments associated with the policy if the user is eligible. For example, 'Provides health coverage up to 5 lakh per family per year.'"),
});

export type PolicySuggestion = z.infer<typeof PolicySuggestionSchema>;

const PolicySchema = z.object({
  name: z.string().min(1, "Name is required."),
  age: z.coerce.number().min(0, "Age must be a positive number."),
  gender: z.string().min(1, "Gender is required."),
  location: z.string().min(1, "Location is required."),
  income: z.coerce.number().min(0, "Income must be a positive number."),
  treatmentDetails: z.string().min(15, 'Please describe the treatment in more detail.'),
  treatmentPhotoDataUrl: z.string().optional(),
});

interface FormState {
  data: PolicySuggestion[] | null;
  error: string | null;
}

export async function checkPolicyEligibility(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get('name'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    location: formData.get('location'),
    income: formData.get('income'),
    treatmentDetails: formData.get('treatmentDetails'),
    treatmentPhotoDataUrl: formData.get('treatmentPhotoDataUrl'),
  };

  const validationResult = PolicySchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      data: null,
      error: validationResult.error.errors.map((e) => e.message).join(', '),
    };
  }
  
  const input: PolicySuggestionInput = validationResult.data;

  try {
    const result = await getPolicySuggestions(input);
    return { data: result.policies, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'An unexpected error occurred while checking policies. Please try again.' };
  }
}
