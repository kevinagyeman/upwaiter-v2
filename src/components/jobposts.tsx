'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JobPost } from '@prisma/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Send, Share, SlidersHorizontal, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LinkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function JobPosts({
  initialJobPosts,
}: {
  initialJobPosts: JobPost[];
}) {
  const [jobPosts, setJobPosts] = useState<JobPost[]>(initialJobPosts || []);
  const [page, setPage] = useState(2); // Inizia da 2 perché la prima pagina è già caricata
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobIdFromURL = searchParams.get('jobId'); // Legge il jobId dall'URL

  // Trova l'indice del job corrente nel carosello
  const initialIndex = jobPosts.findIndex((job) => job.id === jobIdFromURL);

  const fetchMoreJobs = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/jobposts?page=${page}&limit=10`);
      const data = await res.json();

      if (data.jobPosts.length > 0) {
        setJobPosts((prev) => [...prev, ...data.jobPosts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Errore nel caricamento:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!jobPosts.length) return;

    observer.current?.disconnect();
    const lastJobRef = document.querySelector('.job-card:last-child');
    if (!lastJobRef) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreJobs();
      }
    });

    observer.current.observe(lastJobRef);
  }, [jobPosts]);

  useEffect(() => {
    if (initialIndex !== -1) {
      // Scorri fino al job corrispondente se esiste
      document.querySelectorAll('.job-card')[initialIndex]?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [jobPosts]); // Aspetta che i job vengano caricati

  return (
    <div className='p-4 h-[calc(100dvh-4rem-1px)]'>
      <Carousel orientation='vertical' className='w-full'>
        <CarouselContent className='h-[calc(100dvh-5rem-1px)]'>
          {jobPosts.map((job: JobPost, index: number) => (
            <CarouselItem key={index} className='job-card' data-id={job.id}>
              <div className='h-full flex flex-col gap-y-4'>
                <div className='flex items-center gap-x-4'>
                  <div className='flex items-center gap-x-4 flex-1'>
                    <div className='h-10 w-10 rounded-full bg-gray-700'></div>
                    <p className='text-muted-foreground'>Ristorante Armani</p>
                  </div>
                  <Button size='icon' variant={'secondary'}>
                    <SlidersHorizontal />
                  </Button>
                </div>
                <div className='flex-1 space-y-4'>
                  <Badge className='w-fit' variant={'secondary'}>
                    Zurich
                  </Badge>
                  <h1 className='text-5xl font-bold'>{job.title}</h1>
                  <p className='text-muted-foreground text-2xl'>
                    {job.description}
                  </p>
                </div>
                <Button asChild className='text-2xl' size={'lg'}>
                  <Link href={`/waiter/jobposts?jobId=${job.id}`}>
                    Invia candidatura
                  </Link>
                </Button>
                <div className='flex gap-x-3'>
                  <div className='flex items-center gap-x-3 flex-1'>
                    <Users />
                    <span className='text-xl'>33</span>
                  </div>
                  <Button
                    size='icon'
                    variant={'outline'}
                    className='rounded-full'
                  >
                    <Send />
                  </Button>
                  <Button
                    size='icon'
                    variant={'outline'}
                    className='rounded-full'
                  >
                    <LinkIcon />
                  </Button>
                  <Button
                    size='icon'
                    variant={'outline'}
                    className='rounded-full'
                  >
                    <Share />
                  </Button>
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
