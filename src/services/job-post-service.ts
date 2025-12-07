import type { JobPost } from "@prisma/client";
import type { JobPostWithRelations } from "@/types/domain.types";
import { axiosInstance } from "@/lib/axios-instance";

const API_PATH = "job-posts";

// Funzione per gestire le chiamate API
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

// Ottieni tutti i job posts con filtri opzionali
export async function getJobPosts(
	page: number = 1,
	limit: number = 10,
	filters?: {
		country?: string;
		region?: string;
		province?: string;
		municipality?: string;
	},
): Promise<{ jobPosts: JobPostWithRelations[] } | undefined> {
	const params: Record<string, string | number> = {
		page,
		limit,
		...filters,
	};
	return handleApiCall(
		axiosInstance.get(API_PATH, { params }),
		"Error retrieving job posts",
	);
}

// Ottieni i job posts per un'azienda specifica
export async function getJobPostsByCompanyId(
	companyId: string,
): Promise<{ jobPosts: JobPostWithRelations[] } | undefined> {
	return handleApiCall(
		axiosInstance.get(API_PATH, { params: { companyId } }),
		"Error retrieving job posts by company ID",
	);
}

// Ottieni un job post per ID
export async function getJobPostById(
	id: string,
): Promise<JobPostWithRelations | undefined> {
	return handleApiCall<JobPostWithRelations>(
		axiosInstance.get(API_PATH, { params: { id } }),
		"Error retrieving job post by ID",
	);
}

// Crea un nuovo job post
export async function createJobPost(
	jobPostData: Partial<JobPost>,
): Promise<JobPost | undefined> {
	return handleApiCall<JobPost>(
		axiosInstance.post(API_PATH, jobPostData),
		"Error creating job post",
	);
}

// Aggiorna un job post esistente
export async function updateJobPost(
	id: string,
	jobPostData: Partial<JobPost>,
): Promise<JobPost | undefined> {
	return handleApiCall<JobPost>(
		axiosInstance.patch(`${API_PATH}?id=${id}`, jobPostData),
		"Error updating job post",
	);
}

// Elimina un job post
export async function deleteJobPost(
	id: string,
	companyId: string,
): Promise<{ message: string } | undefined> {
	return handleApiCall<{ message: string }>(
		axiosInstance.delete(`${API_PATH}?id=${id}`, { params: { companyId } }),
		"Error deleting job post",
	);
}
