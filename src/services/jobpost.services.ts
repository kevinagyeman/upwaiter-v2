import { JobPost } from '@prisma/client';

const API_PATH = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/jobposts';

// Ottieni tutti i job posts con filtri opzionali
export async function getJobPosts(
  page: number = 1,
  limit: number = 10,
  filters?: { country?: string; canton?: string; municipality?: string }
): Promise<JobPost[]> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (filters?.country) queryParams.append('country', filters.country);
  if (filters?.canton) queryParams.append('canton', filters.canton);
  if (filters?.municipality)
    queryParams.append('municipality', filters.municipality);

  const response = await fetch(`${API_PATH}?${queryParams.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

// Ottieni i job posts per un'azienda specifica
export async function getJobPostsByCompanyId(
  companyId: string
): Promise<JobPost[]> {
  const response = await fetch(`${API_PATH}?companyId=${companyId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

// Ottieni un job post per ID
export async function getJobPostById(id: string): Promise<JobPost> {
  const response = await fetch(`${API_PATH}?id=${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    console.log(`Errore API: ${response.status}`);
  }

  return await response.json();
}

// Crea un nuovo job post
export async function createJobPost(data: Partial<JobPost>): Promise<JobPost> {
  const response = await fetch(API_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }

  return await response.json();
}

// Aggiorna un job post esistente
export async function updateJobPost(
  id: string,
  data: Partial<JobPost>
): Promise<JobPost> {
  const response = await fetch(`${API_PATH}?id=${id}`, {
    method: 'PATCH', // Modificato da PUT a PATCH per aggiornamenti parziali
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }

  return await response.json();
}

// Elimina un job post
export async function deleteJobPost(
  id: string,
  companyId: string
): Promise<void> {
  const response = await fetch(`${API_PATH}?id=${id}&companyId=${companyId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
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
