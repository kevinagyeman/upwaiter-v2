import { z } from 'zod';

export const waiterFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Il nome deve avere almeno 2 caratteri' })
    .optional(),
  lastName: z
    .string()
    .min(2, { message: 'Il cognome deve avere almeno 2 caratteri' })
    .optional(),
  email: z.string().email({ message: "Inserisci un'email valida" }).optional(),
  streetAddress: z.string().optional(),
  contactNumber: z
    .string()
    .regex(/^\+?\d{7,15}$/, {
      message: 'Inserisci un numero di telefono valido',
    })
    .optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'La data deve essere nel formato YYYY-MM-DD',
    })
    .optional(),
  resume: z.string().optional(),
  about: z
    .string()
    .max(1000, {
      message: "Il campo 'about' può contenere al massimo 1000 caratteri",
    })
    .optional(),
  yearsOfExperience: z
    .number()
    .int()
    .min(0, { message: "L'esperienza lavorativa non può essere negativa" })
    .optional()
    .default(0),
  firstLanguage: z.string().optional(),
  secondLanguage: z.string().optional(),
  thirdLanguage: z.string().optional(),
  isAvailableToWork: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type WaiterFormSchema = z.infer<typeof waiterFormSchema>;
