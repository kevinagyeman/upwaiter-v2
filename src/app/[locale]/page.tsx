import Hero from '@/components/hero';
import { getJobPosts } from '@/services/jobpost.services';
import { stackServerApp } from '@/stack';
import { getTranslations } from 'next-intl/server';

export default async function Index() {
  const t = await getTranslations('navbar');
  const jobPosts = await getJobPosts();

  return (
    <>
      <Hero />
      <h1>{t('home')}</h1>
      <pre>{jobPosts && <>{JSON.stringify(jobPosts, null, 2)}</>}</pre>
    </>
  );
}
