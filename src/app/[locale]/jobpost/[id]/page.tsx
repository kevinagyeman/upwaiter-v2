import JobPostDetail from '@/components/jobpost-detail';
import { getJobPostById } from '@/services/jobpost.services';
import { JobPost } from '@prisma/client';

export default async function Page({ params }: { params: { id: string } }) {
  const jobPost: JobPost = await getJobPostById(params.id);

  if (jobPost.id) {
    return <JobPostDetail jobPost={jobPost} />;
  } else {
    return 'non abbiamo trovato questo annuncio';
  }
}
