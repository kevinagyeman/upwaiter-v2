'use client';

import { useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { JobPost } from '@prisma/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Link from 'next/link';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useUser } from '@stackframe/stack';
import JobPostFooter from './job-post-footer';
import JobPostHeader from './job-post-header';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getJobPosts } from '@/services/job-post-service';
import { Skeleton } from './ui/skeleton';

export default function JobPosts() {
  const user = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const canton = searchParams.get('canton') ?? undefined;
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['jobPosts', canton],
      queryFn: ({ pageParam = 1 }) => getJobPosts(pageParam, 10, { canton }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.jobPosts.length > 0 ? allPages.length + 1 : undefined,
      initialPageParam: 1,
    });

  const jobPosts = data?.pages.flatMap((page) => page.jobPosts) || [];

  const lastJobRef = (node: HTMLDivElement | null) => {
    if (isFetchingNextPage || !hasNextPage) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });

    if (node) observer.current.observe(node);
  };

  const resetFilters = () => {
    router.push('/');
  };

  return (
    <div className='p-4 h-[calc(100dvh-4rem-1px)] bg-gradient-to-b dark:from-black dark:to-gray-800 from-white to-gray-100'>
      <Carousel
        orientation='vertical'
        className='w-full'
        plugins={[WheelGesturesPlugin()]}
      >
        <CarouselContent className='h-[calc(100dvh-5rem-1px)]'>
          {jobPosts.map((job: any, index: number) => (
            <CarouselItem
              key={job.id}
              className='job-card'
              data-id={job.id}
              ref={index === jobPosts.length - 1 ? lastJobRef : null} // Assegna il ref all'ultimo elemento
            >
              <div className='h-full flex flex-col gap-y-4'>
                <JobPostHeader />
                <div className='flex-1 space-y-4'>
                  <div className='flex flex-wrap gap-4'>
                    {job?.location?.country && (
                      <Badge className='w-fit' variant={'secondary'}>
                        {job.location.country}
                      </Badge>
                    )}
                    {job?.location?.canton && (
                      <Badge className='w-fit' variant={'secondary'}>
                        {job.location.canton}
                      </Badge>
                    )}
                    {job?.location?.municipality && (
                      <Badge className='w-fit' variant={'secondary'}>
                        {job.location.municipality}
                      </Badge>
                    )}
                  </div>
                  <h1 className='text-5xl font-bold'>{job.title}</h1>
                  <p className='text-muted-foreground text-2xl'>
                    {job.description}
                  </p>
                </div>
                <Button asChild className='text-2xl' size={'lg'}>
                  <Link
                    href={user ? `/job-post/${job.id}` : '/register'}
                    prefetch={true}
                  >
                    Invia candidatura
                  </Link>
                </Button>
                <div className='flex gap-x-3'>
                  <JobPostFooter />
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </div>
            </CarouselItem>
          ))}

          {isLoading && (
            <CarouselItem className='flex flex-col items-center justify-center text-center gap-y-6'>
              <div className='flex space-x-4'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            </CarouselItem>
          )}

          {!hasNextPage && (
            <CarouselItem className='flex flex-col items-center justify-center text-center gap-y-6'>
              <h2 className='text-3xl font-bold'>
                Gli annunci per questa ricerca sono finiti.
              </h2>
              <p className='text-muted-foreground text-lg'>
                Prova a rimuovere i filtri per vedere più annunci.
              </p>
              <Button onClick={resetFilters} className='text-xl'>
                Torna a tutti gli annunci
              </Button>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>

      {isFetchingNextPage && <p>Caricamento in corso...</p>}
    </div>
  );
}
