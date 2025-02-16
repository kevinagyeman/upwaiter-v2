const API_PATH = 'https://axqvoqvbfjpaamphztgd.functions.supabase.co';
const SWISS_API_PATH = 'https://openplzapi.org/ch';

export async function getRegions(): Promise<any> {
  const response = await fetch(`${API_PATH}/regioni`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

export async function getProvincesInRegion(region: string): Promise<any> {
  const response = await fetch(`${API_PATH}/province/${region}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

export async function getComuniInProvince(provincia: string): Promise<any> {
  const response = await fetch(`${API_PATH}/comuni/provincia/${provincia}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

export async function getCantons(): Promise<any> {
  const response = await fetch(`${SWISS_API_PATH}/Cantons`);

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

export async function getDistrictsInCanton(cantonKey: string): Promise<any> {
  const response = await fetch(
    `${SWISS_API_PATH}/Cantons/${cantonKey}/Districts`
  );

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

export async function getMunicipalitiesInDistrict(
  districtKey: string
): Promise<any> {
  const response = await fetch(
    `${SWISS_API_PATH}/Districts/${districtKey}/Communes`
  );

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

import { Location } from '@prisma/client';

const LOCATION_API_PATH =
  process.env.NEXT_PUBLIC_API_BASE_URL + '/api/locations';

// Ottieni tutte le locations
export async function getLocations(page = 1, limit = 10): Promise<Location[]> {
  const response = await fetch(
    `${LOCATION_API_PATH}?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

// Ottieni una location per ID
export async function getLocationById(id: string): Promise<Location> {
  const response = await fetch(`${LOCATION_API_PATH}?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

// Crea una nuova location
export async function createLocation(
  data: Partial<Location>
): Promise<Location> {
  const response = await fetch(LOCATION_API_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }

  return await response.json();
}

// Aggiorna una location esistente
export async function updateLocation(
  id: string,
  data: Partial<Location>
): Promise<Location> {
  const response = await fetch(`${LOCATION_API_PATH}?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }

  return await response.json();
}

// Elimina una location
export async function deleteLocation(id: string): Promise<void> {
  const response = await fetch(`${LOCATION_API_PATH}?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Errore API: ${response.status} - ${
        errorData.error || 'Errore sconosciuto'
      }`
    );
  }
}
