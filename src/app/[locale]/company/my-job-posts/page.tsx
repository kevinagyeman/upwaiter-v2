"use client";

import { useUser } from "@stackframe/stack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
	deleteJobPost,
	getJobPostsByCompanyId,
} from "@/services/job-post-service";
import { Button } from "@/components/ui/button";

export default function MyJobPosts() {
	const user = useUser();
	const queryClient = useQueryClient();

	const { data: companyJobPosts, isLoading } = useQuery({
		queryKey: ["companyJobPosts", user?.id],
		queryFn: () => getJobPostsByCompanyId(user!.id),
		enabled: !!user?.id,
	});

	const deleteMutation = useMutation({
		mutationFn: (jobPostId: string) => deleteJobPost(jobPostId, user!.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["companyJobPosts", user?.id],
			});
		},
	});

	const handleDelete = (jobPostId: string, jobTitle: string) => {
		if (
			window.confirm(`Sei sicuro di voler eliminare l'annuncio "${jobTitle}"?`)
		) {
			deleteMutation.mutate(jobPostId);
		}
	};

	if (isLoading) {
		return "attendi";
	}

	console.log(companyJobPosts);

	return (
		<div className="container mx-auto">
			{companyJobPosts.jobPosts.map((job: any, index: number) => (
				<div key={index}>
					<h2>{job.title}</h2>
					<p>{job.description}</p>
					<p>numero candidature: {job.applicationsCount}</p>
					<p>lista candidati:</p>
					<ul>
						{job.applications.map((application: any, index: number) => (
							<div key={index}>
								<p>{application.waiter.firstName}</p>
								<a href={`/waiter/${application.waiterId}`}>
									guarda il cameriere
								</a>
							</div>
						))}
					</ul>
					<div className="flex gap-2 mt-2">
						<Link href={`/job-post/${job.id}`} prefetch>
							Guarda Annuncio di lavoro
						</Link>
						<Button
							variant="destructive"
							size="sm"
							onClick={() => handleDelete(job.id, job.title)}
							disabled={deleteMutation.isPending}
						>
							{deleteMutation.isPending ? "Eliminazione..." : "Elimina"}
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
