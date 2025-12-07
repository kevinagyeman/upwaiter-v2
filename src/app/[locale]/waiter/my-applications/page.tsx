"use client";

import { useUser } from "@stackframe/stack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
	deleteApplication,
	getApplicationsForWaiter,
} from "@/services/application-service";
import { Button } from "@/components/ui/button";

export default function MyApplications() {
	const user = useUser();
	const queryClient = useQueryClient();

	const { data: applications, isLoading } = useQuery({
		queryKey: ["applications", user?.id],
		queryFn: () => getApplicationsForWaiter(user!.id),
		enabled: !!user?.id,
	});

	const deleteMutation = useMutation({
		mutationFn: (applicationId: string) => deleteApplication(applicationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["applications", user?.id] });
		},
	});

	const handleDelete = (applicationId: string, jobTitle: string) => {
		if (
			window.confirm(
				`Sei sicuro di voler rimuovere la candidatura per "${jobTitle}"?`,
			)
		) {
			deleteMutation.mutate(applicationId);
		}
	};

	if (isLoading) {
		return "attendi";
	}

	return (
		<div className="container mx-auto">
			<h1 className="text-2xl font-bold mb-4">Applications</h1>
			<div className="flex flex-col gap-4">
				{applications?.map((application: any, index: number) => (
					<div className="" key={index}>
						<h1>{application.jobPost.title}</h1>
						<p>{application.status}</p>
						<div className="flex gap-2 mt-2">
							<Link href={`/job-post/${application.jobPostId}`}>Dettagli</Link>
							<Button
								variant="destructive"
								size="sm"
								onClick={() =>
									handleDelete(application.id, application.jobPost.title)
								}
								disabled={deleteMutation.isPending}
							>
								{deleteMutation.isPending ? "Rimozione..." : "Rimuovi"}
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
