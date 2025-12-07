import type { JobPostSchema } from "./job-post-schema-type";

export interface ApplicationSchema {
	id: string;
	waiterId: string;
	jobPostId: string;
	jobPost: JobPostSchema;
	status: string;
	createdAt: string;
	updatedAt: string;
}
