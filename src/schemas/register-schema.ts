import { z } from 'zod';

export const registerFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['company', 'waiter']),
    companyName: z.string().optional(),
    vatNumber: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === 'company') {
        return !!data.companyName && !!data.vatNumber;
      }
      return true;
    },
    {
      message: 'Company fields are required when registering as a company',
      path: ['companyName', 'vatNumber'],
    }
  );

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
