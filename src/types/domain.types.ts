import type {
	Application,
	Company,
	JobPost,
	Location,
	Prisma,
	Waiter,
} from "@prisma/client";

// Extended types with relations
export type JobPostWithRelations = JobPost & {
	company: Pick<Company, "id" | "name">;
	location: Location | null;
	applications?: ApplicationWithWaiter[];
	applicationsCount?: number;
};

export type ApplicationWithWaiter = Application & {
	waiter: Waiter;
};

export type ApplicationWithJobPost = Application & {
	jobPost: JobPostWithRelations;
};

export type CompanyWithLocation = Company & {
	location: Location | null;
};

export type WaiterWithLocation = Waiter & {
	location: Location | null;
};

// Prisma where clause types for type-safe queries
export type JobPostWhereInput = Prisma.JobPostWhereInput;
export type WaiterWhereInput = Prisma.WaiterWhereInput;
export type LocationWhereInput = Prisma.LocationWhereInput;
