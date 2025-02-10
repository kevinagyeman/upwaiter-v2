const API_PATH = 'https://axqvoqvbfjpaamphztgd.functions.supabase.co';

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
