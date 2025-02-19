import { z } from 'zod';

export const companyFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Il nome deve avere almeno 3 caratteri' })
    .optional(),
  email: z
    .string()
    .email({ message: 'Inserisci un indirizzo email valido' })
    .optional(),
  vatNumber: z
    .string()
    .min(1, { message: 'La partita IVA è obbligatoria' })
    .optional(),
  contactNumber: z.string().optional(),
  streetAddress: z.string().optional(),
  website: z.string().url({ message: 'Inserisci un URL valido' }).optional(),
  about: z.string().optional(),
});

export type CompanyFormSchema = z.infer<typeof companyFormSchema>;
