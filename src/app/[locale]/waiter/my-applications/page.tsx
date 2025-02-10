'use client';

import { getApplicationsForWaiter } from '@/services/application.services';
import { useStackApp } from '@stackframe/stack';
import { useEffect, useState } from 'react';

export default function Page() {
  const app = useStackApp();
  const user = app.useUser();
  const [applications, setApplications] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      getApplicationsForWaiter(user.id)
        .then((data) => {
          setApplications(data);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [user]);

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <div>
      <h1>Applications</h1>
      <pre>
        {applications
          ? JSON.stringify(applications, null, 2)
          : 'Caricamento...'}{' '}
      </pre>
    </div>
  );
}
