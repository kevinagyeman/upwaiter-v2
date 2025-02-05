import Hero from '@/components/hero';
import { stackServerApp } from '@/stack';
import { getTranslations } from 'next-intl/server';

export default async function Index() {
  const t = await getTranslations('navbar');
  const app = stackServerApp;
  const user = await app.getUser();

  return (
    <>
      <Hero />
      <h1>{t('home')}</h1>
      {/* {user?.clientMetadata.role === 'company' && (
        <>{JSON.stringify(companyData)}</>
      )}

      {user?.clientMetadata.role === 'waiter' && (
        <>{JSON.stringify(waiterData)}</>
      )} */}
      {/* <button onClick={addCompany}>Add company</button> */}
    </>
  );
}
