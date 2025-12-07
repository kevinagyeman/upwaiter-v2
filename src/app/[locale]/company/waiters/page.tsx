import WaitersList from "@/components/waiters-list";
import WaiterCard from "@/components/waiters-list";
import { getWaiters } from "@/services/waiter-service";

export default async function Waiters() {
	const waiters = await getWaiters();
	return (
		<div className="mx-auto container">
			<WaitersList />
		</div>
	);
}
