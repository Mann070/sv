// This file is machine-generated - edit with care!
'use server';
/**
 * @fileOverview An AI symptom guide that suggests the appropriate medical department and provides care advice based on user-described symptoms.
 *
 * - suggestDepartment - A function that suggests a medical department and care advice based on symptoms.
 * - SuggestDepartmentInput - The input type for the suggestDepartment function.
 * - SuggestDepartmentOutput - The return type for the suggestDepartment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDepartmentInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms the user is experiencing.'),
});
export type SuggestDepartmentInput = z.infer<typeof SuggestDepartmentInputSchema>;

const SuggestDepartmentOutputSchema = z.object({
  suggestedDepartment: z
    .string()
    .describe('The medical department the user should consult.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the department suggestion.'),
  careAdvice: z
    .string()
    .describe(
      'Simple, actionable first-aid or self-care steps the user can take. This should be presented as a numbered or bulleted list.'
    ),
  isDoctorVisitRecommended: z
    .boolean()
    .describe('Whether a visit to a doctor is recommended based on the symptoms.'),
});
export type SuggestDepartmentOutput = z.infer<typeof SuggestDepartmentOutputSchema>;

export async function suggestDepartment(input: SuggestDepartmentInput): Promise<SuggestDepartmentOutput> {
  return suggestDepartmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDepartmentPrompt',
  input: {schema: SuggestDepartmentInputSchema},
  output: {schema: SuggestDepartmentOutputSchema},
  prompt: `You are an AI assistant that suggests the appropriate medical department for a user and provides simple care advice based on their described symptoms.

  Symptoms: {{{symptoms}}}

  1.  Consider various medical departments such as Cardiology, Dermatology, Gastroenterology, Neurology, Oncology, Ophthalmology, Orthopedics, Otolaryngology, Pediatrics, Psychiatry, Pulmonology, Rheumatology, Urology, and others.
  2.  Suggest the most relevant medical department and explain your reasoning.
  3.  Provide simple, actionable first-aid or self-care steps the user can take for temporary relief. This should be a numbered list and must not suggest taking any medication.
  4.  Based on the symptoms, determine if a visit to a doctor is recommended.
  5.  Always include a disclaimer that your advice is not a substitute for professional medical diagnosis.`,
});

const suggestDepartmentFlow = ai.defineFlow(
  {
    name: 'suggestDepartmentFlow',
    inputSchema: SuggestDepartmentInputSchema,
    outputSchema: SuggestDepartmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
