import { Company } from '@prisma/client';

const API_PATH = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/companies';

export async function getCompanies() {
  const response = await fetch(API_PATH, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }
  return await response.json();
}

export async function getCompanyById(id: string) {
  const response = await fetch(`${API_PATH}?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }
  return await response.json();
}

export async function createCompany(company: Partial<Company>) {
  const response = await fetch(API_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company),
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }
  return await response.json();
}

export async function updateCompany(id: string, updates: Partial<Company>) {
  const response = await fetch(API_PATH, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updates }),
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }
  return await response.json();
}
