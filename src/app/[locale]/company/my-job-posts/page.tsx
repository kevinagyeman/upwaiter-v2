"use client";

import { Button } from "@/components/ui/button";
import {
	deleteJobPost,
	getJobPostsByCompanyId,
} from "@/services/job-post-service";
import type { ApplicationSchema } from "@/types/application-schema-type";
import { useUser } from "@stackframe/stack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function MyJobPosts() {
	const t = useTranslations("company.myJobPosts");
	const user = useUser();
	const queryClient = useQueryClient();

	const { data: companyJobPosts, isLoading } = useQuery({
		queryKey: ["companyJobPosts", user?.id],
		queryFn: () => getJobPostsByCompanyId(user?.id),
		enabled: !!user?.id,
	});

	const deleteMutation = useMutation({
		mutationFn: (jobPostId: string) => deleteJobPost(jobPostId, user?.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["companyJobPosts", user?.id],
			});
		},
	});

	const handleDelete = (jobPostId: string, jobTitle: string) => {
		if (window.confirm(t("confirmDelete", { jobTitle }))) {
			deleteMutation.mutate(jobPostId);
		}
	};

	if (isLoading) {
		return t("loading");
	}

	console.log(companyJobPosts);

	return (
		<div className="container mx-auto">
			{companyJobPosts.jobPosts.map((job, index: number) => (
				<div key={index}>
					<h2>{job.title}</h2>
					<p>{job.description}</p>
					<p>
						{t("applicationsCount")} {job.applicationsCount}
					</p>
					<p>{t("applicationsList")}</p>
					<ul>
						{job.applications.map(
							(application: ApplicationSchema, index: number) => (
								<div key={index}>
									<p>{application.waiter.firstName}</p>
									<a href={`/waiter/${application.waiterId}`}>
										{t("viewWaiter")}
									</a>
								</div>
							),
						)}
					</ul>
					<div className="flex gap-2 mt-2">
						<Link href={`/job-post/${job.id}`} prefetch>
							{t("viewJobPost")}
						</Link>
						<Button
							variant="destructive"
							size="sm"
							onClick={() => handleDelete(job.id, job.title)}
							disabled={deleteMutation.isPending}
						>
							{deleteMutation.isPending ? t("deleting") : t("delete")}
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
