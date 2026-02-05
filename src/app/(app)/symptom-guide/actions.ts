'use server';

import {
  suggestDepartment,
  type SuggestDepartmentInput,
  type SuggestDepartmentOutput,
} from '@/ai/flows/ai-symptom-guide';
import { z } from 'zod';

const SymptomSchema = z.object({
  symptoms: z.string().min(10, 'Please describe your symptoms in more detail.'),
});

interface FormState {
  data: SuggestDepartmentOutput | null;
  error: string | null;
}

export async function getDepartmentSuggestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    symptoms: formData.get('symptoms'),
  };

  const validationResult = SymptomSchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      data: null,
      error: validationResult.error.errors.map((e) => e.message).join(', '),
    };
  }
  
  const input: SuggestDepartmentInput = validationResult.data;

  try {
    const result = await suggestDepartment(input);
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'An unexpected error occurred. Please try again.' };
  }
}
