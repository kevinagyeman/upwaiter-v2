import WaiterDetail from "@/components/waiter-detail";
import { getWaiterById } from "@/services/waiter-service";

export default async function Page({ params }: { params: { id: string } }) {
	const waiter = await getWaiterById(params.id);

	if (waiter.id) {
		return (
			<div className="mx-auto container">
				<WaiterDetail waiter={waiter} />
			</div>
		);
	} else {
		return "non abbiamo trovato questo profilo";
	}
}
