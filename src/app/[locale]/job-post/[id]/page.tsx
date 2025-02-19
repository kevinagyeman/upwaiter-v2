import JobPostDetail from '@/components/job-post-detail';
import { checkApplication } from '@/services/application-service';
import { getJobPostById } from '@/services/job-post-service';
import { stackServerApp } from '@/stack';
import { JobPost } from '@prisma/client';

export default async function Page({ params }: { params: { id: string } }) {
  const app = stackServerApp;
  const user = await app.getUser();
  const jobPost: JobPost = await getJobPostById(params.id);
  let hasApplied = false;

  if (user) {
    hasApplied = await checkApplication(user.id, jobPost.id);
  }

  if (jobPost.id) {
    return <JobPostDetail jobPost={jobPost} hasApplied={hasApplied} />;
  } else {
    return 'non abbiamo trovato questo annuncio';
  }
}
