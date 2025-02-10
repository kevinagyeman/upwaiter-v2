import { getWaiterById } from '@/services/waiter.services';

export default async function Page({ params }: { params: { id: string } }) {
  const waiter = await getWaiterById(params.id);

  if (waiter.id) {
    return (
      <>
        <pre>{JSON.stringify(waiter, null, 2)}</pre>
      </>
    );
  } else {
    return 'non abbiamo trovato questo profilo';
  }
}
