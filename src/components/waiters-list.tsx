"use client";

import type { Waiter } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { getWaiters } from "@/services/waiter-service";
import { Button } from "./ui/button";

// Funzione per recuperare i camerieri filtrati per location

export default function WaitersList() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const canton = searchParams.get("canton") ?? undefined;
	const observer = useRef<IntersectionObserver | null>(null);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["waiters", canton],
			queryFn: ({ pageParam = 1 }) => getWaiters(pageParam, 10, { canton }),
			getNextPageParam: (lastPage, allPages) =>
				lastPage.waiters.length > 0 ? allPages.length + 1 : undefined,
			initialPageParam: 1,
		});

	const waitersList = data?.pages.flatMap((page) => page.waiters) || [];

	const lastWaiterRef = (node: HTMLDivElement | null) => {
		if (isFetchingNextPage || !hasNextPage) return;
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) fetchNextPage();
		});

		if (node) observer.current.observe(node);
	};

	const resetFilters = () => {
		router.push("/company/waiters");
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{waitersList.map((waiter: Waiter, index: number) => (
				<div
					key={waiter.id}
					className="border p-4 rounded-lg"
					ref={index === waitersList.length - 1 ? lastWaiterRef : null}
				>
					<h2 className="text-2xl font-bold">
						{waiter.firstName} {waiter.lastName}
					</h2>
					<p className="text-muted-foreground">{waiter.contactNumber}</p>
					<p className="text-muted-foreground">{waiter.email}</p>
					<Button asChild size={"sm"} variant={"secondary"}>
						<Link href={`/waiter/${waiter.id}`} className="mt-2">
							Guarda il profilo completo <UserRound />
						</Link>
					</Button>
				</div>
			))}
			{isFetchingNextPage && <p>Caricamento in corso...</p>}
			{!hasNextPage && (
				<div className="text-center col-span-full">
					<h2 className="text-2xl font-bold">
						Nessun altro cameriere trovato.
					</h2>
					<Button onClick={resetFilters} className="mt-2">
						Rimuovi filtri
					</Button>
				</div>
			)}
		</div>
	);
}
