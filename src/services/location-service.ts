import type { Location } from "@prisma/client";
import { axiosInstance } from "@/lib/axios-instance";

const API_PATH = "locations";

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

export const getLocations = (page = 1, limit = 10) =>
	handleApiCall(
		axiosInstance.get(`${API_PATH}?page=${page}&limit=${limit}`),
		"Errore nel recupero delle locations",
	);

export const getLocationById = (id: string) =>
	handleApiCall(
		axiosInstance.get(`${API_PATH}?id=${id}`),
		"Errore nel recupero della location",
	);

export async function createLocation(data: Partial<Location>) {
	// Validazione dei dati
	if (!data.country || !data.isoCode) {
		console.error("Country and ISO Code are required for creating a location");
		return undefined;
	}

	return handleApiCall(
		axiosInstance.post(API_PATH, data),
		"Errore nella creazione della location",
	);
}

export async function updateLocation(id: string, data: Partial<Location>) {
	// Validazione dell'ID
	if (!id) {
		console.error("ID is required for updating a location");
		return undefined;
	}

	return handleApiCall(
		axiosInstance.patch(API_PATH, { id, ...data }),
		"Errore nell'aggiornamento della location",
	);
}

export async function deleteLocation(id: string) {
	// Validazione dell'ID
	if (!id) {
		console.error("ID is required for deleting a location");
		return undefined;
	}

	return handleApiCall(
		axiosInstance.delete(`${API_PATH}?id=${id}`),
		"Errore nell'eliminazione della location",
	);
}
