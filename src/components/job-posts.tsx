"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { getJobPosts } from "@/services/job-post-service";
import type { JobPostWithRelations } from "@/types/domain.types";
import { useUser } from "@stackframe/stack";
import { useInfiniteQuery } from "@tanstack/react-query";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import JobPostFooter from "./job-post-footer";
import JobPostHeader from "./job-post-header";
import JobPostWrapper from "./job-post-wrapper";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function JobPosts() {
	const user = useUser();
	const searchParams = useSearchParams();
	const router = useRouter();

	const region = searchParams.get("region") ?? undefined;
	const province = searchParams.get("province") ?? undefined;
	const municipality = searchParams.get("municipality") ?? undefined;
	const observer = useRef<IntersectionObserver | null>(null);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["jobPosts", region, province, municipality],
			queryFn: ({ pageParam = 1 }) =>
				getJobPosts(pageParam, 10, { region, province, municipality }),
			getNextPageParam: (lastPage, allPages) =>
				lastPage.jobPosts.length > 0 ? allPages.length + 1 : undefined,
			initialPageParam: 1,
		});

	const jobPosts = data?.pages.flatMap((page) => page.jobPosts) || [];

	const lastJobRef = (node: HTMLDivElement | null) => {
		if (isFetchingNextPage || !hasNextPage) return;
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) fetchNextPage();
		});

		if (node) observer.current.observe(node);
	};

	const resetFilters = () => {
		router.push("/");
	};

	// bg-gradient-to-b dark:from-black dark:to-gray-950 from-white to-gray-100
	return (
		<>
			<Carousel
				orientation="vertical"
				className="w-full"
				plugins={[WheelGesturesPlugin()]}
			>
				<CarouselContent className="h-[calc(100dvh-4rem-1px)]">
					{jobPosts.map((jobPost: JobPostWithRelations, index: number) => (
						<CarouselItem
							key={jobPost.id}
							className="jobPost-card"
							data-id={jobPost.id}
							ref={index === jobPosts.length - 1 ? lastJobRef : null} // Assegna il ref all'ultimo elemento
						>
							<JobPostWrapper>
								<JobPostHeader />
								<div className="flex-1 space-y-4 mt-4">
									<div className="flex flex-wrap gap-4">
										{jobPost?.location?.country && (
											<Badge className="w-fit" variant={"secondary"}>
												{jobPost.location.country}
											</Badge>
										)}
										{jobPost?.location?.region && (
											<Badge className="w-fit" variant={"secondary"}>
												{jobPost.location.region}
											</Badge>
										)}
										{jobPost?.location?.province && (
											<Badge className="w-fit" variant={"secondary"}>
												{jobPost.location.province}
											</Badge>
										)}
										{jobPost?.location?.municipality && (
											<Badge className="w-fit" variant={"secondary"}>
												{jobPost.location.municipality}
											</Badge>
										)}
									</div>
									<h1 className="text-5xl font-bold">{jobPost.title}</h1>
									<p className="text-muted-foreground text-2xl">
										{jobPost.description}
									</p>
								</div>
								<Button asChild className="text-2xl" size={"lg"}>
									<Link
										href={user ? `/jobPost-post/${jobPost.id}` : "/register"}
										prefetch={true}
									>
										Details
									</Link>
								</Button>
								<div className="flex gap-x-3">
									<div className="flex-1">
										<JobPostFooter jobPost={jobPost} />
									</div>
									<CarouselPrevious />
									<CarouselNext />
								</div>
							</JobPostWrapper>
						</CarouselItem>
					))}

					{isLoading && <SkeletonJobPosts />}

					{!hasNextPage && (
						<CarouselItem className="flex flex-col items-center justify-center text-center gap-y-6">
							<h2 className="text-3xl font-bold">
								Gli annunci per questa ricerca sono finiti.
							</h2>
							<p className="text-muted-foreground text-lg">
								Prova a rimuovere i filtri per vedere più annunci.
							</p>
							<Button onClick={resetFilters} className="text-xl">
								Torna a tutti gli annunci
							</Button>
						</CarouselItem>
					)}
				</CarouselContent>
			</Carousel>

			{isFetchingNextPage && <p>Caricamento in corso...</p>}
		</>
	);
}

const SkeletonJobPosts = () => {
	return (
		<CarouselItem>
			<div className="h-full flex flex-col p-4 bg-gradient-to-b dark:from-black dark:to-gray-950 from-white to-gray-100 rounded-2xl border gap-4 justify-between text-center gap-y-6">
				<div className="flex gap-4">
					<Skeleton className="h-20 w-20 rounded-full" />
					<div className="flex flex-col gap-4 flex-1">
						<Skeleton className="h-full w-full rounded-full" />
						<Skeleton className="h-full w-full rounded-full" />
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<Skeleton className="h-10 rounded-3xl" />
					<Skeleton className="h-10 w-4/5 rounded-3xl" />
					<Skeleton className="h-10 w-3/5 rounded-3xl" />
					<Skeleton className="h-10 w-4/5 rounded-3xl" />
					<Skeleton className="h-10 w-5/5 rounded-3xl" />
					<Skeleton className="h-10 w-4/5 rounded-3xl" />
					<Skeleton className="h-10 w-3/5 rounded-3xl" />
				</div>
				<div>
					<Skeleton className="h-14 rounded-3xl" />
				</div>
			</div>
		</CarouselItem>
	);
};
