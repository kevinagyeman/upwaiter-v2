import Apply from '@/components/apply';
import DeleteJobPost from '@/components/delete-jobpost';
import { getCompanyById } from '@/services/company.services';
import { getJobPostById, deleteJobPost } from '@/services/jobpost.services';
import { getWaiterById } from '@/services/waiter.services';
import { stackServerApp } from '@/stack';
import { Company, JobPost, Waiter } from '@prisma/client';

export default async function Page({ params }: { params: { id: string } }) {
  const app = stackServerApp;
  const user = await app.getUser();
  const jobPost: JobPost = await getJobPostById(params.id);
  let waiter = {} as Waiter;
  let company = {} as Company;

  if (user?.clientMetadata.role === 'waiter') {
    waiter = await getWaiterById(user.id);
  }

  if (user?.clientMetadata.role === 'company') {
    company = await getCompanyById(user.id);
  }

  if (jobPost.id) {
    return (
      <>
        <pre>{JSON.stringify(jobPost, null, 2)}</pre>
        {waiter.id ? (
          <Apply waiterId={waiter.id} jobPostId={jobPost.id} />
        ) : (
          <a href='/register'>iscriviti per candidarti</a>
        )}

        {company.id && (
          <DeleteJobPost companyId={company.id} jobPostId={jobPost.id} />
        )}
      </>
    );
  } else {
    return 'non abbiamo trovato questo annuncio';
  }
}
