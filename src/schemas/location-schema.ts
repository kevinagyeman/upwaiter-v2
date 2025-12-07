import { z } from "zod";

export const locationFormSchema = z.object({
	isoCode: z.string().default("IT"),
	country: z.string().default("Italy"),

	// Italian location fields (required)
	region: z.string(),
	province: z.string(),
	municipality: z.string(),

	// Swiss location fields (optional for backwards compatibility)
	canton: z.string().optional(),
	district: z.string().optional(),

	// Other optional fields
	state: z.string().optional(),
	county: z.string().optional(),
	city: z.string().optional(),
	neighborhood: z.string().optional(),

	postalCode: z.string().optional(),

	latitude: z.number().optional(),
	longitude: z.number().optional(),
});

export type LocationFormSchema = z.infer<typeof locationFormSchema>;
