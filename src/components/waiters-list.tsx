'use client';

import { Waiter } from '@prisma/client';
import { Button } from './ui/button';
import Link from 'next/link';
import { UserRound } from 'lucide-react';

type WaiterCardProps = {
  waitersList: Waiter[];
};

export default function WaitersList({ waitersList }: WaiterCardProps) {
  console.log('waitersList', waitersList);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {waitersList
        ?.flatMap((waiter: Waiter) => Array(10).fill(waiter))
        .map((waiter: Waiter, index: number) => (
          <div key={index} className='border p-4 rounded-lg'>
            <h2 className='text-2xl font-bold'>
              {waiter.firstName} {waiter.lastName}
            </h2>
            <p className='text-muted-foreground'>{waiter.contactNumber}</p>
            <p className='text-muted-foreground'>{waiter.email}</p>
            <Button asChild size={'sm'} variant={'secondary'}>
              <Link href={`/waiter/${waiter.id}`} className='mt-2'>
                Guarda il profilo completo <UserRound />
              </Link>
            </Button>
          </div>
        ))}
    </div>
  );
}
