import CompanyJobPosts from '@/components/company-jobposts';
import Hero from '@/components/hero';
import JobPosts from '@/components/jobposts';
import PaginationElement from '@/components/pagination-element';
import { getCompanyById } from '@/services/company.services';
import {
  getJobPosts,
  getJobPostsByCompanyId,
} from '@/services/jobpost.services';
import { stackServerApp } from '@/stack';
import { JobPost } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

export default async function MyJobPosts() {
  const t = await getTranslations('navbar');
  const app = stackServerApp;
  const user = await app.getUser();
  let jobPosts: any;

  jobPosts = await getJobPosts(1, 5);

  if (user?.id) {
    jobPosts = await getJobPostsByCompanyId(user.id);
  }
  return (
    <>
      {jobPosts && <CompanyJobPosts jobPosts={jobPosts.jobPosts} />}
      <PaginationElement />
    </>
  );
}
