'use client';

import { getWaiterById } from '@/services/waiter-service';
import { useUser } from '@stackframe/stack';
import { useEffect, useState } from 'react';

export default function Hero() {
  const user = useUser();
  const [waiterData, setWaiterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWaiterById(user?.id || '');
        setWaiterData(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  if (loading) return <>Caricamento...</>;
  if (error) return <div>Sorry, there was an error</div>;

  return (
    <div>
      <pre>
        {waiterData ? JSON.stringify(waiterData, null, 2) : 'No data available'}
      </pre>
    </div>
  );
}
