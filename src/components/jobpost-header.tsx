import React from 'react';
import { JobPost } from '@prisma/client';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';

export default function JobPostHeader() {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='flex items-center gap-x-4 flex-1'>
        <div className='h-10 w-10 rounded-full bg-gray-700'></div>
        <p className='text-muted-foreground'>Ristorante Armani</p>
      </div>
      <Button variant={'secondary'}>
        Filtra <SlidersHorizontal />
      </Button>
      <Button variant={'link'}>Sono una azienda</Button>
    </div>
  );
}
