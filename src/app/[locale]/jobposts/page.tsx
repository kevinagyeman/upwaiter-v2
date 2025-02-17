import JobPosts from '@/components/jobposts';
import { Button } from '@/components/ui/button';
import { getJobPosts } from '@/services/jobpost.services';

export default async function Page() {
  const currentPage = 1;
  const itemsPerPage = 10;
  const { jobPosts } = await getJobPosts(currentPage, itemsPerPage);

  return (
    <div className='mx-auto container flex justify-between'>
      <div className='mt-2 flex flex-col gap-4'>
        <h4 className='text-2xl font-bold'>I più cercati</h4>
        <Button variant={'secondary'} className='w-fit'>
          Zurich
        </Button>
        <Button variant={'secondary'} className='w-fit'>
          Svizzera
        </Button>
        <Button variant={'secondary'} className='w-fit'>
          Locarno
        </Button>
        <Button variant={'secondary'} className='w-fit'>
          Zurigo
        </Button>
        <Button variant={'secondary'} className='w-fit'>
          Geneva
        </Button>
      </div>
      <div className='max-w-lg'>
        <JobPosts initialJobPosts={jobPosts} />
      </div>
      <div className='mt-2 flex flex-col gap-4 items-end'>
        <h4 className='text-2xl font-bold'>Sei una azienda?</h4>
        <Button variant={'secondary'} className='w-fit'>
          Scopri di più
        </Button>
      </div>
    </div>
  );
}
