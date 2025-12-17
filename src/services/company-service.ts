import { axiosInstance } from "@/lib/axios-instance";
import type { Company, JobPost, Location } from "@prisma/client";

const API_PATH = "companies";

type JobPostWithCount = JobPost & {
	location: Location | null;
	_count: {
		applications: number;
	};
};

type CompanyWithRelations = Company & {
	location: Location | null;
	jobs: JobPostWithCount[];
};

async function handleApiCall<T>(
	apiCall: Promise<{ data: T }>,
	errorMessage: string,
): Promise<T | undefined> {
	try {
		const { data } = await apiCall;
		return data;
	} catch (error) {
		console.error(`${errorMessage}:`, error);
		return undefined;
	}
}

export async function getCompanies(): Promise<Company[] | undefined> {
	return handleApiCall<Company[]>(
		axiosInstance.get(API_PATH),
		"Error retrieving companies",
	);
}

export async function getCompanyById(
	id: string,
): Promise<CompanyWithRelations | undefined> {
	return handleApiCall<CompanyWithRelations>(
		axiosInstance.get(API_PATH, { params: { id } }),
		"Error retrieving the company",
	);
}

export async function createCompany(company: Partial<Company>) {
	return handleApiCall(
		axiosInstance.post(API_PATH, company),
		"Error creating the company",
	);
}

export async function updateCompany(id: string, updates: Partial<Company>) {
	return handleApiCall(
		axiosInstance.patch(API_PATH, { id, ...updates }),
		"Error updating the company",
	);
}
