import axios from 'axios';

const API_PATH = 'https://axqvoqvbfjpaamphztgd.functions.supabase.co';
const SWISS_API_PATH = 'https://openplzapi.org/ch';
const LOCATION_API_PATH =
  process.env.NEXT_PUBLIC_API_BASE_URL + '/api/locations';

// const axiosInstance = axios.create({
//   headers: { 'Content-Type': 'application/json' },
// });

async function handleApiCall<T>(
  apiCall: Promise<{ data: T }>,
  errorMessage: string
): Promise<T | undefined> {
  try {
    const { data } = await apiCall;
    return data;
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    return undefined;
  }
}

// API per regioni italiane
export const getRegions = () =>
  handleApiCall(
    axios.get(`${API_PATH}/regioni`),
    'Errore nel recupero delle regioni'
  );

export const getProvincesInRegion = (region: string) =>
  handleApiCall(
    axios.get(`${API_PATH}/province/${region}`),
    'Errore nel recupero delle province'
  );

export const getComuniInProvince = (provincia: string) =>
  handleApiCall(
    axios.get(`${API_PATH}/comuni/provincia/${provincia}`),
    'Errore nel recupero dei comuni'
  );

// API per cantoni svizzeri
export const getCantons = () =>
  handleApiCall(
    axios.get(`${SWISS_API_PATH}/Cantons`),
    'Errore nel recupero dei cantoni'
  );

export const getDistrictsInCanton = (cantonKey: string) =>
  handleApiCall(
    axios.get(`${SWISS_API_PATH}/Cantons/${cantonKey}/Districts`),
    'Errore nel recupero dei distretti'
  );

export const getMunicipalitiesInDistrict = (districtKey: string) =>
  handleApiCall(
    axios.get(`${SWISS_API_PATH}/Districts/${districtKey}/Communes`),
    'Errore nel recupero dei comuni'
  );

// API per locations
export const getLocations = (page = 1, limit = 10) =>
  handleApiCall(
    axios.get(`${LOCATION_API_PATH}?page=${page}&limit=${limit}`),
    'Errore nel recupero delle locations'
  );

export const getLocationById = (id: string) =>
  handleApiCall(
    axios.get(`${LOCATION_API_PATH}?id=${id}`),
    'Errore nel recupero della location'
  );

export async function createLocation(data: Partial<Location>) {
  return handleApiCall(
    axios.post(LOCATION_API_PATH, data),
    'Errore nella creazione della location'
  );
}

export async function updateLocation(id: string, data: Partial<Location>) {
  return handleApiCall(
    axios.patch(`${LOCATION_API_PATH}?id=${id}`, data),
    "Errore nell'aggiornamento della location"
  );
}

export async function deleteLocation(id: string) {
  return handleApiCall(
    axios.delete(`${LOCATION_API_PATH}?id=${id}`),
    "Errore nell'eliminazione della location"
  );
}
