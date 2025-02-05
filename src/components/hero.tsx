'use client';

import { getCompanyById } from '@/services/company.services';
import { getWaiterById } from '@/services/waiter.services';
import { stackServerApp } from '@/stack';
import { useStackApp, useUser } from '@stackframe/stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function Hero() {
  const app = useStackApp();
  const user = useUser();

  const isWaiter = user?.clientMetadata.role === 'waiter';
  const isCompany = user?.clientMetadata.role === 'company';

  const { data, isLoading, isError } = useQuery({
    queryKey: [isWaiter ? 'waiter' : 'company', user?.id],
    queryFn: () =>
      isWaiter ? getWaiterById(user?.id || '') : getCompanyById(user?.id || ''),
    enabled: !!user?.id,
  });

  if (isLoading) return <>Caricamento...</>;
  if (isError) return <div>Sorry, there was an error</div>;

  return (
    <div>
      <h1 className='text-4xl font-extrabold'>
        Tu sei un {user?.clientMetadata.role}
      </h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
