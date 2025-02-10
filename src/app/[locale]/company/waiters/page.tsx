import { getWaiters } from '@/services/waiter.services';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function Waiters() {
  const t = await getTranslations('navbar');
  const waiters = await getWaiters();
  return (
    <>
      <pre>{JSON.stringify(waiters, null, 2)}</pre>
    </>
  );
}
