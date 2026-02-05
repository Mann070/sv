// This file is machine-generated - edit with care!
'use server';
/**
 * @fileOverview An AI flow to determine eligibility for Indian government health and welfare policies.
 *
 * - getPolicySuggestions - A function that returns a list of relevant government policies and the user's eligibility status for each.
 * - PolicySuggestionInput - The input type for the getPolicySuggestions function.
 * - PolicySuggestionOutput - The return type for the getPolicySuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PolicySuggestionInputSchema = z.object({
  name: z.string().describe('The full name of the user.'),
  age: z.number().describe('The age of the user.'),
  gender: z.string().describe('The gender of the user.'),
  location: z.string().describe('The state or union territory where the user resides in India.'),
  income: z.number().describe('The annual family income of the user in Indian Rupees (INR).'),
  treatmentDetails: z.string().describe('A description of the medical treatment required or the user\'s situation (e.g., disability, maternity).'),
  treatmentPhotoDataUrl: z.string().optional().describe("A photo of a relevant treatment document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type PolicySuggestionInput = z.infer<typeof PolicySuggestionInputSchema>;

const PolicySuggestionSchema = z.object({
    policyName: z.string().describe("The official name of the government policy."),
    description: z.string().describe("A brief description of the policy."),
    isEligible: z.boolean().describe("Whether the user is likely eligible for this policy based on the provided details."),
    eligibilityReason: z.string().describe("A clear, concise explanation of why the user is or is not eligible for this policy, referencing their specific data (e.g., 'Eligible because income is below the threshold for this scheme.' or 'Not eligible because this scheme is only for residents of Kerala.')."),
    bonds: z.array(z.string()).optional().describe("A list of key benefits, requirements, or commitments associated with the policy if the user is eligible. For example, 'Provides health coverage up to 5 lakh per family per year.'"),
});
export type PolicySuggestion = z.infer<typeof PolicySuggestionSchema>;

const PolicySuggestionOutputSchema = z.object({
  policies: z.array(PolicySuggestionSchema),
});
export type PolicySuggestionOutput = z.infer<
  typeof PolicySuggestionOutputSchema
>;

export async function getPolicySuggestions(
  input: PolicySuggestionInput
): Promise<PolicySuggestionOutput> {
  return governmentPolicyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'governmentPolicyPrompt',
  input: { schema: PolicySuggestionInputSchema },
  output: { schema: PolicySuggestionOutputSchema },
  prompt: `You are an expert on Indian government health and welfare schemes. Based on the user's details and the provided treatment document, evaluate their eligibility for the following list of major central and state-specific schemes.

  User Details:
  - Name: {{{name}}}
  - Age: {{{age}}}
  - Gender: {{{gender}}}
  - Location: {{{location}}}
  - Annual Income: {{{income}}} INR
  - Needs/Treatment Description: {{{treatmentDetails}}}
  
  {{#if treatmentPhotoDataUrl}}
  - Uploaded Document:
  {{media url=treatmentPhotoDataUrl}}
  Use the information from this document as a primary source for understanding the user's medical condition or situation.
  {{/if}}

  Your task is to return a list of policies. For EACH of the policies listed below, you MUST determine if the user is eligible.
  
  Provide a clear 'eligibilityReason' for your decision on EACH policy, referencing the user's data and the document if available. If they are eligible, list the key 'bonds' or benefits.

  List of Policies to Evaluate:
  1.  **Ayushman Bharat (PM-JAY)**:
      - Key Criteria: Included in the SECC 2011 database, or possessing a RSBY card. Primarily for lower-income families. No age/gender barrier.
      - Benefits: Health cover of Rs. 5 lakh per family per year.
  2.  **Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)**:
      - Key Criteria: Specifically for pregnant women.
      - Benefits: Free antenatal care on the 9th of every month.
  3.  **Rashtriya Bal Swasthya Karyakram (RBSK)**:
      - Key Criteria: For children from birth to 18 years.
      - Benefits: Screening and treatment for 4 'D's: Defects at birth, Deficiencies, Diseases, Development delays.
  4.  **National Policy for Persons with Disabilities**:
      - Key Criteria: User has a disability (as can be inferred from treatment details or the document).
      - Benefits: Varies, includes support for education, employment, and healthcare.
  5.  **Senior Citizen Health Insurance Scheme (SCHIS)**:
      - Key Criteria: For senior citizens (age 60+).
      - Benefits: Top-up health cover for specific critical illnesses.
  6.  **State-Specific Schemes**: Based on the user's location, consider a major health scheme from that state. For example:
      - **Rajasthan**: Chiranjeevi Swasthya Bima Yojana.
      - **Tamil Nadu**: Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS).
      - **Karnataka**: Arogya Karnataka Scheme.
      - **Delhi**: Delhi Arogya Kosh.
      - **West Bengal**: Swasthya Sathi.

  Return the analysis for all relevant policies from the list above in the specified JSON format. Ensure every policy you evaluate is included in the output array, with the 'isEligible' flag set correctly.`,
});

const governmentPolicyFlow = ai.defineFlow(
  {
    name: 'governmentPolicyFlow',
    inputSchema: PolicySuggestionInputSchema,
    outputSchema: PolicySuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
