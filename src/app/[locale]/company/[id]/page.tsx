import { getCompanyById } from '@/services/company.services';

export default async function Company({ params }: { params: { id: string } }) {
  const company = await getCompanyById(params.id);

  if (company.id) {
    return (
      <>
        <pre>{JSON.stringify(company, null, 2)}</pre>
      </>
    );
  } else {
    return 'non abbiamo trovato questa azienda';
  }
}
