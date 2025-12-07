import { z } from "zod";
import { locationFormSchema } from "./location-schema";

const swissPhoneRegex =
	/^(?:\+41|0)(?:[ ]?[1-9][0-9]{1,2}){1,2}[ ]?[0-9]{2,3}[ ]?[0-9]{2}$/;

export const companyFormSchema = z.object({
	name: z.string().min(3),
	email: z.string().email().readonly(),
	vatNumber: z.string().readonly(),
	contactNumber: z
		.string()
		.optional()
		.refine((value) => !value || swissPhoneRegex.test(value), {
			message:
				"Inserisci un numero di telefono svizzero valido con il prefisso +41",
		}),
	website: z.string().optional(),
	about: z.string().optional(),
	location: locationFormSchema,
});

export type CompanyFormSchema = z.infer<typeof companyFormSchema>;
