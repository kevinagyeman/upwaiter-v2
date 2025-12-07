import type { ApplicationSchema } from "./application-schema-type";

export interface JobPostSchema {
	id: string;
	title: string;
	description: string;
	companyId: string;
	createdAt: string;
	updatedAt: string;
	applications: ApplicationSchema[];
	locationId: string | null;
	location: Location;
}
