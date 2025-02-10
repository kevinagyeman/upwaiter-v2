import { z } from 'zod';

export const jobPostFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Il titolo deve avere almeno 3 caratteri' }),
  description: z
    .string()
    .min(1, { message: 'La descrizione deve avere almeno 10 caratteri' }),
  country: z.string().default('Italia'),
  region: z.string(),
  province: z.string(),
});

export type JobPostFormSchema = z.infer<typeof jobPostFormSchema>;
