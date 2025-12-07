"use client";

import { useUser } from "@stackframe/stack";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getJobPostsByCompanyId } from "@/services/job-post-service";

export default function MyJobPosts() {
	const user = useUser();

	const { data: companyJobPosts, isLoading } = useQuery({
		queryKey: ["companyJobPosts", user?.id],
		queryFn: () => getJobPostsByCompanyId(user!.id),
		enabled: !!user?.id,
	});

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
					<Link href={`/job-post/${job.id}`} prefetch>
						Guarda Annuncio di lavoro
					</Link>
				</div>
			))}
		</div>
	);
}
