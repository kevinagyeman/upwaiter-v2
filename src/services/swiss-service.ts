import axios from "axios";
import type { Canton } from "@/types/swiss-location-type";

const SWISS_API_PATH = "https://openplzapi.org/ch";

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

export const getCantons = () =>
	handleApiCall<Canton[]>(
		axios.get(`${SWISS_API_PATH}/Cantons`),
		"Errore nel recupero dei cantoni",
	);

export const getDistrictsInCanton = (cantonKey: string) =>
	handleApiCall(
		axios.get(`${SWISS_API_PATH}/Cantons/${cantonKey}/Districts`),
		"Errore nel recupero dei distretti",
	);

export const getMunicipalitiesInDistrict = (districtKey: string) =>
	handleApiCall(
		axios.get(`${SWISS_API_PATH}/Districts/${districtKey}/Communes`),
		"Errore nel recupero dei comuni",
	);
