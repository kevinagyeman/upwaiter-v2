'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getJobPosts } from '@/services/jobpost.services';
import { Button } from './ui/button';

export default function AdScroller() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  const { data: jobPosts, isLoading } = useQuery({
    queryKey: ['jobPosts'],
    queryFn: () => getJobPosts(),
  });

  let ads = [
    { id: 1, title: 'Ad 1', description: 'Descrizione 1' },
    { id: 2, title: 'Ad 2', description: 'Descrizione 2' },
    { id: 3, title: 'Ad 3', description: 'Descrizione 3' },
    { id: 4, title: 'Ad 4', description: 'Descrizione 4' },
    { id: 5, title: 'Ad 5', description: 'Descrizione 5' },
    { id: 6, title: 'Ad 6', description: 'Descrizione 6' },
    { id: 7, title: 'Ad 7', description: 'Descrizione 7' },
    { id: 8, title: 'Ad 8', description: 'Descrizione 8' },
    { id: 9, title: 'Ad 9', description: 'Descrizione 9' },
    { id: 10, title: 'Ad 10', description: 'Descrizione 10' },
  ];

  if (jobPosts?.jobPosts?.length) {
    ads = jobPosts.jobPosts;
  }

  const handleSwipe = (dir: 'up' | 'down') => {
    if (dir === 'up' && currentIndex < ads.length - 1) {
      setDirection('up');
      setCurrentIndex((prev) => prev + 1);
    } else if (dir === 'down' && currentIndex > 0) {
      setDirection('down');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className='h-screen w-full flex items-center justify-center overflow-hidden relative'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={ads[currentIndex]?.id}
          className='absolute w-full h-full flex items-center justify-center max-w-md bg-red-700'
          initial={{ y: direction === 'up' ? '100%' : '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: direction === 'up' ? '-100%' : '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          drag='y'
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.y < -100) handleSwipe('up');
            if (info.offset.y > 100) handleSwipe('down');
          }}
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className='flex flex-col gap-4'>
              <h1 className='text-3xl font-bold'>{ads[currentIndex]?.title}</h1>
              <p className='text-lg text-muted-foreground'>
                {ads[currentIndex]?.description}
              </p>
              <Button variant={'outline'} size={'sm'}>
                Leggi i dettagli
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
