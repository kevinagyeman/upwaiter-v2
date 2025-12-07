import { z } from "zod";

export const locationFormSchema = z.object({
	isoCode: z.string(),
	country: z.string(),

	canton: z.string(),
	district: z.string(),
	municipality: z.string(),

	region: z.string().optional(),
	province: z.string().optional(),

	state: z.string().optional(),
	county: z.string().optional(),
	city: z.string().optional(),
	neighborhood: z.string().optional(),

	postalCode: z.string().optional(),

	latitude: z.number().optional(),
	longitude: z.number().optional(),
});

export type LocationFormSchema = z.infer<typeof locationFormSchema>;
