import JobPosts from '@/components/jobposts';
import { getJobPosts } from '@/services/jobpost.services';

export default async function Page({ searchParams }: any) {
  const currentPage = 1;
  const itemsPerPage = 10;
  const jobPosts: any = await getJobPosts(currentPage, itemsPerPage);

  return (
    <div className='mx-auto container max-w-md'>
      <JobPosts initialJobPosts={jobPosts} />
    </div>
  );
}
