'use client';

import { getApplicationsForWaiter } from '@/services/application-service';
import { useUser } from '@stackframe/stack';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function MyApplications() {
  const user = useUser();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications', user?.id],
    queryFn: () => getApplicationsForWaiter(user!.id),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return 'attendi';
  }

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Applications</h1>
      <div className='flex flex-col gap-4'>
        {applications?.map((application: any, index: number) => (
          <div className='' key={index}>
            <h1>{application.jobPost.title}</h1>
            <p>{application.status}</p>
            <Link href={`/job-post/${application.jobPostId}`}>Dettagli</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
