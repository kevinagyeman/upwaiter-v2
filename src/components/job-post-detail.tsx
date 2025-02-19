'use client';

import { createApplication } from '@/services/application-service';
import { JobPost } from '@prisma/client';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import JobPostFooter from './job-post-footer';
import { Button } from './ui/button';

type JobPostDetailProps = {
  jobPost: JobPost;
  hasApplied: boolean;
};

export default function JobPostDetail({
  jobPost,
  hasApplied,
}: JobPostDetailProps) {
  const user = useUser();
  const router = useRouter();

  const handleApply = async () => {
    try {
      if (user?.clientMetadata?.role === 'waiter') {
        await createApplication(user.id, jobPost.id);
        router.refresh();
      } else {
        router.push('/register');
      }
    } catch (error) {
      console.log('Errore durante la creazione della candidatura:', error);
    }
  };

  return (
    <div className='p-4 h-[calc(100dvh-4rem-1px)]  max-w-lg mx-auto flex flex-col gap-4'>
      <div className='flex-shrink-0'>
        <div className='flex items-center gap-x-4 flex-1'>
          <div className='h-10 w-10 rounded-full bg-gray-700'></div>
          <p className='text-muted-foreground'>Ristorante Armani</p>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto space-y-2'>
        <h1 className='text-5xl font-bold'>titolo</h1>
        <p className='text-muted-foreground text-lg font-light'>
          {jobPost.description}
        </p>
      </div>
      <div className='flex-shrink-0'>
        {!hasApplied ? (
          <Button
            className='text-2xl w-full mb-2'
            size={'lg'}
            onClick={handleApply}
          >
            Invia candidatura
          </Button>
        ) : (
          <>Candidatura inviata</>
        )}

        <JobPostFooter />
      </div>
    </div>
  );
}
