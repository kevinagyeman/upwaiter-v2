import Link from 'next/link';
import { JobPostsFilter } from './job-posts-filter';
import { Button } from './ui/button';

export default function JobPostHeader() {
  return (
    <>
      <div className='flex gap-4'>
        <div className='flex items-center gap-4'>
          <div className='min-h-12 min-w-12 rounded-full bg-gray-700 items-center'></div>
          <div>
            <span className='text-muted-foreground line-clamp-1'>
              Ristorante Armani Ristorante Armani Ristorante Armani
            </span>
            <span>
              <Link href={'/dd'} className='text-primary font-medium'>
                Sono una azienda
              </Link>
            </span>
          </div>
        </div>
        <JobPostsFilter />
      </div>
    </>
  );
}
