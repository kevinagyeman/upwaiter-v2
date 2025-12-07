import axios from "axios";
import type {
	Comune,
	Municipalities,
	Municipality,
	Provinces,
	Province,
	Region,
	Regions,
} from "@/types/italian-location-type";

const API_URL = "https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni";

let cachedComuni: Comune[] | null = null;

// Fetch all comuni (municipalities) from the API
async function fetchAllComuni(): Promise<Comune[]> {
	if (cachedComuni) {
		return cachedComuni;
	}

	try {
		const { data } = await axios.get<Comune[]>(API_URL);
		cachedComuni = data;
		return data;
	} catch (error) {
		console.error("Error fetching comuni:", error);
		return [];
	}
}

// Get all unique regions
export async function getRegions(): Promise<Regions> {
	const comuni = await fetchAllComuni();

	const regionNames = new Set<string>();
	comuni.forEach((comune) => {
		if (comune.provincia?.regione) {
			regionNames.add(comune.provincia.regione);
		}
	});

	return Array.from(regionNames)
		.sort()
		.map((name) => ({ name }));
}

// Get all provinces in a specific region
export async function getProvincesInRegion(
	regionName: string,
): Promise<Provinces> {
	const comuni = await fetchAllComuni();

	const provinceMap = new Map<string, Province>();

	comuni.forEach((comune) => {
		if (comune.provincia?.regione === regionName) {
			const key = comune.provincia.codice;
			if (!provinceMap.has(key)) {
				provinceMap.set(key, {
					name: comune.provincia.nome,
					code: comune.provincia.sigla,
					region: comune.provincia.regione,
				});
			}
		}
	});

	return Array.from(provinceMap.values()).sort((a, b) =>
		a.name.localeCompare(b.name),
	);
}

// Get all municipalities in a specific province
export async function getMunicipalitiesInProvince(
	provinceCode: string,
): Promise<Municipalities> {
	const comuni = await fetchAllComuni();

	return comuni
		.filter((comune) => comune.provincia?.sigla === provinceCode)
		.map((comune) => ({
			name: comune.nome,
			province: comune.provincia.nome,
			region: comune.provincia.regione,
			code: comune.codice,
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

// Clear cache (useful for testing or refresh)
export function clearComuniCache() {
	cachedComuni = null;
}
