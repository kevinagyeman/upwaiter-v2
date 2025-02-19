import { axiosInstance } from '@/lib/axios-instance';

const API_PATH = 'applications';

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

// Crea una nuova applicazione
export async function createApplication(waiterId: string, jobPostId: string) {
  return handleApiCall(
    axiosInstance.post(API_PATH, { waiterId, jobPostId }),
    'Error creating application'
  );
}

// Ottieni le applicazioni per un cameriere
export async function getApplicationsForWaiter(waiterId: string) {
  return handleApiCall(
    axiosInstance.get(API_PATH, { params: { waiterId } }),
    'Error retrieving applications for waiter'
  );
}

// Aggiorna lo stato di un'applicazione
export async function updateApplicationStatus(id: string, status: string) {
  return handleApiCall(
    axiosInstance.patch(API_PATH, { id, status }),
    'Error updating application status'
  );
}

// Elimina un'applicazione
export async function deleteApplication(id: string) {
  return handleApiCall(
    axiosInstance.delete(API_PATH, { params: { id } }),
    'Error deleting application'
  );
}

// Controlla se un cameriere ha già fatto domanda
export async function checkApplication(waiterId: string, jobPostId: string) {
  const data = await handleApiCall(
    axiosInstance.get(API_PATH, { params: { waiterId, jobPostId } }),
    'Error checking application'
  );
  return data ? data.applied : false; // Restituisce false se non ci sono dati
}
