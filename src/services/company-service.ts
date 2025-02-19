import { axiosInstance } from '@/lib/axios-instance';
import { Company } from '@prisma/client';

const API_PATH = 'companies';

async function handleApiCall(apiCall: Promise<any>, errorMessage: string) {
  try {
    const { data } = await apiCall;
    return data;
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    return undefined;
  }
}

export async function getCompanies() {
  return handleApiCall(
    axiosInstance.get(API_PATH),
    'Error retrieving companies'
  );
}

export async function getCompanyById(id: string) {
  return handleApiCall(
    axiosInstance.get(API_PATH, { params: { id } }),
    'Error retrieving the company'
  );
}

export async function createCompany(company: Partial<Company>) {
  return handleApiCall(
    axiosInstance.post(API_PATH, company),
    'Error creating the company'
  );
}

export async function updateCompany(id: string, updates: Partial<Company>) {
  return handleApiCall(
    axiosInstance.patch(API_PATH, { id, ...updates }),
    'Error updating the company'
  );
}
