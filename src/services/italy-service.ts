import axios from "axios";

const API_PATH = "https://axqvoqvbfjpaamphztgd.functions.supabase.co";

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

export const getRegions = () =>
	handleApiCall(
		axios.get(`${API_PATH}/regioni`),
		"Errore nel recupero delle regioni",
	);

export const getProvincesInRegion = (region: string) =>
	handleApiCall(
		axios.get(`${API_PATH}/province/${region}`),
		"Errore nel recupero delle province",
	);

export const getComuniInProvince = (provincia: string) =>
	handleApiCall(
		axios.get(`${API_PATH}/comuni/provincia/${provincia}`),
		"Errore nel recupero dei comuni",
	);
