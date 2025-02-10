export async function createApplication(waiterId: string, jobPostId: string) {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ waiterId, jobPostId }),
  });

  const data = await response.json();
  console.log(data);
}

export async function getApplications() {
  const response = await fetch('/api/applications');
  const data = await response.json();
  console.log(data);
}

export async function getApplicationById(id: string) {
  const response = await fetch(`/api/applications?id=${id}`);
  const data = await response.json();
  console.log(data);
}

export async function updateApplicationStatus(id: string, status: string) {
  const response = await fetch('/api/applications', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, status }),
  });

  const data = await response.json();
  console.log(data);
}

export async function deleteApplication(id: string) {
  const response = await fetch(`/api/applications?id=${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  console.log(data);
}

export async function getApplicationsForJobPost(jobPostId: string) {
  const response = await fetch(`/api/applications?jobPostId=${jobPostId}`, {
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

export async function getApplicationsForWaiter(waiterId: string) {
  const response = await fetch(`/api/applications?waiterId=${waiterId}`, {
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
