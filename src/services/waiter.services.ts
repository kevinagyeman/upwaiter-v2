import { Waiter } from '@prisma/client';

const API_PATH = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/waiters';

export async function getWaiters() {
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

export async function getWaiterById(id: string) {
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

export async function createWaiter(waiter: Partial<Waiter>) {
  const dataToCreate = Object.fromEntries(
    Object.entries(waiter).filter(([key, value]) => value != null)
  );
  const response = await fetch(API_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToCreate),
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }
  return await response.json();
}

export async function updateWaiter(id: string, updates: Partial<Waiter>) {
  const dataToUpdate = Object.fromEntries(
    Object.entries(updates).filter(([key, value]) => value != null)
  );
  const response = await fetch(`${API_PATH}?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToUpdate),
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }
  return await response.json();
}
