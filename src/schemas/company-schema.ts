import { z } from 'zod';

export const companyFormSchema = z.object({
  name: z.string().min(3, { message: 'Il nome deve avere almeno 3 caratteri' }),
  email: z.string().email({ message: 'Inserisci un indirizzo email valido' }),
  vatNumber: z.string().min(1, { message: 'La partita IVA è obbligatoria' }),
  country: z.string().optional().default('Italia'),
  region: z.string().optional(),
  province: z.string().optional(),
  contactNumber: z.string().optional(),
  streetAddress: z.string().optional(),
  website: z.string().url({ message: 'Inserisci un URL valido' }).optional(),
  about: z.string().optional(),
});

export type CompanyFormSchema = z.infer<typeof companyFormSchema>;
