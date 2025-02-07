import { JobPost } from '@prisma/client';

const API_PATH = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/jobposts';

// Ottieni tutti i job posts
export async function getJobPosts(): Promise<JobPost[]> {
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

// Ottieni i job posts per un'azienda specifica
export async function getJobPostsByCompany(
  companyId: string
): Promise<JobPost[]> {
  const response = await fetch(`${API_PATH}?companyId=${companyId}`, {
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

// Ottieni un job post per ID
export async function getJobPostById(id: string): Promise<JobPost> {
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

// Crea un nuovo job post
export async function createJobPost(
  data: Pick<JobPost, 'companyId' | 'title' | 'description'>
): Promise<JobPost> {
  const response = await fetch(API_PATH, {
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

// Aggiorna un job post esistente
export async function updateJobPost(
  id: string,
  data: Partial<JobPost>
): Promise<JobPost> {
  const response = await fetch(`${API_PATH}?id=${id}`, {
    method: 'PATCH', // Modificato da PUT a PATCH per aggiornamenti parziali
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
