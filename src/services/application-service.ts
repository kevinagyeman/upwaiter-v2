import type { Application } from "@prisma/client";
import type { ApplicationWithJobPost } from "@/types/domain.types";
import { axiosInstance } from "@/lib/axios-instance";

const API_PATH = "applications";

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

// Crea una nuova applicazione
export async function createApplication(
	waiterId: string,
	jobPostId: string,
): Promise<Application | undefined> {
	return handleApiCall<Application>(
		axiosInstance.post(API_PATH, { waiterId, jobPostId }),
		"Error creating application",
	);
}

// Ottieni le applicazioni per un cameriere
export async function getApplicationsForWaiter(
	waiterId: string,
): Promise<ApplicationWithJobPost[] | undefined> {
	return handleApiCall<ApplicationWithJobPost[]>(
		axiosInstance.get(API_PATH, { params: { waiterId } }),
		"Error retrieving applications for waiter",
	);
}

// Aggiorna lo stato di un'applicazione
export async function updateApplicationStatus(
	id: string,
	status: string,
): Promise<Application | undefined> {
	return handleApiCall<Application>(
		axiosInstance.patch(API_PATH, { id, status }),
		"Error updating application status",
	);
}

// Elimina un'applicazione
export async function deleteApplication(
	id: string,
): Promise<{ message: string } | undefined> {
	return handleApiCall<{ message: string }>(
		axiosInstance.delete(API_PATH, { params: { id } }),
		"Error deleting application",
	);
}

// Controlla se un cameriere ha già fatto domanda
export async function checkApplication(
	waiterId: string,
	jobPostId: string,
): Promise<boolean> {
	const data = await handleApiCall<{ applied: boolean }>(
		axiosInstance.get(API_PATH, { params: { waiterId, jobPostId } }),
		"Error checking application",
	);
	return data ? data.applied : false;
}
