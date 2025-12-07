import { z } from "zod";

export const waiterFormSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().optional(),
	streetAddress: z.string().optional(),
	contactNumber: z.string().optional(),
	dateOfBirth: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "La data deve essere nel formato YYYY-MM-DD",
		})
		.optional(),
	resume: z.string().optional(),
	about: z.string().optional(),
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
