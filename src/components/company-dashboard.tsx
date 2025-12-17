"use client";

import { getJobPostsByCompanyId } from "@/services/job-post-service";
import type { ApplicationSchema } from "@/types/application-schema-type";
import { useUser } from "@stackframe/stack";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Eye, Plus, TrendingUp, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";
import { DataLoading } from "./data-loading";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

export default function CompanyDashboard() {
	const t = useTranslations("company.dashboard");
	const user = useUser();

	const { data: companyJobPosts, isLoading } = useQuery({
		queryKey: ["companyJobPosts", user?.id],
		queryFn: () => getJobPostsByCompanyId(user?.id),
		enabled: !!user?.id,
	});

	const stats = useMemo(() => {
		if (!companyJobPosts?.jobPosts) {
			return {
				totalPosts: 0,
				totalApplications: 0,
				activePosts: 0,
				recentApplications: [],
			};
		}

		const jobPosts = companyJobPosts.jobPosts;
		const totalPosts = jobPosts.length;
		const totalApplications = jobPosts.reduce(
			(sum, post) => sum + (post.applicationsCount || 0),
			0,
		);
		const activePosts = jobPosts.filter(
			(post) => (post.applicationsCount || 0) > 0,
		).length;

		// Get all applications and sort by date
		const allApplications = jobPosts
			.flatMap((post) =>
				(post.applications || []).map((app: ApplicationSchema) => ({
					...app,
					jobPostTitle: post.title,
				})),
			)
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			)
			.slice(0, 5);

		return {
			totalPosts,
			totalApplications,
			activePosts,
			recentApplications: allApplications,
		};
	}, [companyJobPosts]);

	if (isLoading) {
		return <DataLoading />;
	}

	return (
		<div className="container mx-auto px-4 py-8 space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">{t("title")}</h1>
					<p className="text-muted-foreground mt-1">{t("subtitle")}</p>
				</div>
				<Button asChild size="lg">
					<Link href="/company/create-job-post">
						<Plus className="h-5 w-5 mr-2" />
						{t("createJobPost")}
					</Link>
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("totalJobPosts")}
						</CardTitle>
						<Briefcase className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalPosts}</div>
						<p className="text-xs text-muted-foreground mt-1">
							{stats.activePosts} {t("withApplications")}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("totalApplications")}
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalApplications}</div>
						<p className="text-xs text-muted-foreground mt-1">
							{t("acrossAllPosts")}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("averagePerPost")}
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.totalPosts > 0
								? Math.round(
										(stats.totalApplications / stats.totalPosts) * 10,
									) / 10
								: 0}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{t("applicationsPerPost")}
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				{/* Recent Applications */}
				<Card className="md:col-span-1">
					<CardHeader>
						<CardTitle>{t("recentApplications")}</CardTitle>
						<CardDescription>{t("latestCandidates")}</CardDescription>
					</CardHeader>
					<CardContent>
						{stats.recentApplications.length === 0 ? (
							<div className="text-center py-8 text-muted-foreground">
								{t("noApplicationsYet")}
							</div>
						) : (
							<div className="space-y-4">
								{stats.recentApplications.map((application: any) => (
									<div
										key={application.id}
										className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
									>
										<div className="flex-1">
											<p className="font-medium">
												{application.waiter.firstName}{" "}
												{application.waiter.lastName}
											</p>
											<p className="text-sm text-muted-foreground">
												{application.jobPostTitle}
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												{new Date(application.createdAt).toLocaleDateString()}
											</p>
										</div>
										<Button asChild variant="ghost" size="sm">
											<Link href={`/waiter/${application.waiterId}`}>
												<Eye className="h-4 w-4" />
											</Link>
										</Button>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Top Job Posts */}
				<Card className="md:col-span-1">
					<CardHeader>
						<CardTitle>{t("topJobPosts")}</CardTitle>
						<CardDescription>{t("mostPopularPosts")}</CardDescription>
					</CardHeader>
					<CardContent>
						{!companyJobPosts?.jobPosts ||
						companyJobPosts.jobPosts.length === 0 ? (
							<div className="text-center py-8 text-muted-foreground">
								{t("noJobPostsYet")}
							</div>
						) : (
							<div className="space-y-3">
								{companyJobPosts.jobPosts
									.sort(
										(a, b) =>
											(b.applicationsCount || 0) - (a.applicationsCount || 0),
									)
									.slice(0, 5)
									.map((post) => (
										<div
											key={post.id}
											className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
										>
											<div className="flex-1 min-w-0">
												<p className="font-medium truncate">{post.title}</p>
												<p className="text-sm text-muted-foreground">
													{post.location?.municipality || post.location?.region}
												</p>
											</div>
											<Badge variant="secondary" className="ml-2">
												<Users className="h-3 w-3 mr-1" />
												{post.applicationsCount || 0}
											</Badge>
										</div>
									))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>{t("quickActions")}</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<Button asChild variant="outline" className="h-auto py-4">
						<Link href="/company/my-job-posts" className="flex flex-col gap-2">
							<Briefcase className="h-6 w-6" />
							<span>{t("manageJobPosts")}</span>
						</Link>
					</Button>
					<Button asChild variant="outline" className="h-auto py-4">
						<Link href="/company/my-profile" className="flex flex-col gap-2">
							<Users className="h-6 w-6" />
							<span>{t("editProfile")}</span>
						</Link>
					</Button>
					<Button asChild variant="outline" className="h-auto py-4">
						<Link
							href="/company/create-job-post"
							className="flex flex-col gap-2"
						>
							<Plus className="h-6 w-6" />
							<span>{t("createJobPost")}</span>
						</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
