import { axiosInstance } from '@/lib/axios-instance';
import { JobPost } from '@prisma/client';

const API_PATH = 'job-posts';

// Funzione per gestire le chiamate API
async function handleApiCall(apiCall: Promise<any>, errorMessage: string) {
  try {
    const { data } = await apiCall;
    return data;
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    return undefined; // O lanciare un errore se necessario
  }
}

// Ottieni tutti i job posts con filtri opzionali
export async function getJobPosts(
  page: number = 1,
  limit: number = 10,
  filters?: { country?: string; canton?: string; municipality?: string }
): Promise<{ jobPosts: JobPost[] }> {
  const params: any = { page, limit, ...filters };
  return handleApiCall(
    axiosInstance.get(API_PATH, { params }),
    'Error retrieving job posts'
  );
}

// Ottieni i job posts per un'azienda specifica
export async function getJobPostsByCompanyId(companyId: string): Promise<any> {
  return handleApiCall(
    axiosInstance.get(API_PATH, { params: { companyId } }),
    'Error retrieving job posts by company ID'
  );
}

// Ottieni un job post per ID
export async function getJobPostById(id: string): Promise<JobPost> {
  return handleApiCall(
    axiosInstance.get(API_PATH, { params: { id } }),
    'Error retrieving job post by ID'
  );
}

// Crea un nuovo job post
export async function createJobPost(
  jobPostData: Partial<JobPost>
): Promise<JobPost> {
  return handleApiCall(
    axiosInstance.post(API_PATH, jobPostData),
    'Error creating job post'
  );
}

// Aggiorna un job post esistente
export async function updateJobPost(
  id: string,
  jobPostData: Partial<JobPost>
): Promise<JobPost> {
  return handleApiCall(
    axiosInstance.patch(`${API_PATH}?id=${id}`, jobPostData),
    'Error updating job post'
  );
}

// Elimina un job post
export async function deleteJobPost(
  id: string,
  companyId: string
): Promise<void> {
  return handleApiCall(
    axiosInstance.delete(`${API_PATH}?id=${id}`, { params: { companyId } }),
    'Error deleting job post'
  );
}
