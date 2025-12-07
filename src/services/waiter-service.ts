import type { Waiter } from "@prisma/client";
import { axiosInstance } from "@/lib/axios-instance";

const API_PATH = "waiters";

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

export const getWaiters = (
	page: number = 1,
	limit: number = 10,
	filters?: {
		country?: string;
		region?: string;
		province?: string;
		municipality?: string;
	},
) => {
	const params: Record<string, string | number> = {
		page,
		limit,
		...filters,
	};
	return handleApiCall(
		axiosInstance.get(API_PATH, { params }),
		"Errore nel recupero dei camerieri",
	);
};

export const getWaiterById = (id: string) =>
	handleApiCall(
		axiosInstance.get(API_PATH, { params: { id } }),
		"Errore nel recupero del cameriere",
	);

export async function createWaiter(waiter: Partial<Waiter>) {
	const dataToCreate = Object.fromEntries(
		Object.entries(waiter).filter(([_, value]) => value != null),
	);

	return handleApiCall(
		axiosInstance.post(API_PATH, dataToCreate),
		"Errore nella creazione del cameriere",
	);
}

export async function updateWaiter(id: string, updates: Partial<Waiter>) {
	const dataToUpdate = Object.fromEntries(
		Object.entries(updates).filter(([_, value]) => value != null),
	);

	return handleApiCall(
		axiosInstance.patch(`${API_PATH}?id=${id}`, dataToUpdate),
		"Errore nell'aggiornamento del cameriere",
	);
}
