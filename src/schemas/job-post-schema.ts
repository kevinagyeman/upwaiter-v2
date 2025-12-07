import { z } from "zod";
import { locationFormSchema } from "./location-schema";

export const jobPostFormSchema = z.object({
	title: z.string().min(3),
	description: z.string().min(10),
	location: locationFormSchema,
});

export type JobPostFormSchema = z.infer<typeof jobPostFormSchema>;
