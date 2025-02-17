import { axiosInstance } from '@/lib/axios-instance';

export async function createApplication(waiterId: string, jobPostId: string) {
  const { data } = await axiosInstance.post('/applications', {
    waiterId,
    jobPostId,
  });
  return data;
}

export async function getApplicationsForWaiter(waiterId: string) {
  const { data } = await axiosInstance.get('/applications', {
    params: { waiterId },
  });
  return data;
}

export async function updateApplicationStatus(id: string, status: string) {
  const { data } = await axiosInstance.patch('/applications', { id, status });
  return data;
}

export async function deleteApplication(id: string) {
  const { data } = await axiosInstance.delete('/applications', {
    params: { id },
  });
  return data;
}
