import { z } from "zod";
import { locationFormSchema } from "./location-schema";

const swissPhoneRegex =
	/^(?:\+41|0)(?:[ ]?[1-9][0-9]{1,2}){1,2}[ ]?[0-9]{2,3}[ ]?[0-9]{2}$/;

export const companyFormSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Il campo name deve contenere almeno 1 caratteri" }),
	email: z.string().email().readonly(),
	vatNumber: z.string().readonly(),
	contactNumber: z
		.string()
		.optional()
		.refine((value) => !value || swissPhoneRegex.test(value), {
			message:
				"Inserisci un numero di telefono svizzero valido con il prefisso +41",
		}),
	website: z
		.string()
		.url({ message: "Inserisci un URL valido es: https://upwaiter.com" })
		.optional(),
	about: z
		.string()
		.min(10, { message: 'Il campo "about" deve contenere almeno 10 caratteri' })
		.optional(),
	location: locationFormSchema,
});

export type CompanyFormSchema = z.infer<typeof companyFormSchema>;
