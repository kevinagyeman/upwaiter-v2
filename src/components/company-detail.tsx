"use client";

import type { Company, JobPost, Location } from "@prisma/client";
import {
	Briefcase,
	Building2,
	Globe,
	Mail,
	MapPin,
	Phone,
	Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type JobPostWithCount = JobPost & {
	location: Location | null;
	_count: {
		applications: number;
	};
};

type CompanyWithRelations = Company & {
	location: Location | null;
	jobs: JobPostWithCount[];
};

type CompanyDetailProps = {
	company: CompanyWithRelations;
};

export default function CompanyDetail({ company }: CompanyDetailProps) {
	const t = useTranslations("company.profile");
	const tLoc = useTranslations("location");

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			{/* Company Header */}
			<Card className="mb-6">
				<CardHeader>
					<div className="flex items-start gap-4">
						<div className="rounded-full bg-primary/10 p-4">
							<Building2 className="h-8 w-8 text-primary" />
						</div>
						<div className="flex-1">
							<CardTitle className="text-3xl mb-2">{company.name}</CardTitle>
							{company.about && (
								<p className="text-muted-foreground text-lg">{company.about}</p>
							)}
						</div>
					</div>
				</CardHeader>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				{/* Contact Information */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Phone className="h-5 w-5" />
							{t("contactInfo")}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{company.email && (
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<a
									href={`mailto:${company.email}`}
									className="text-sm hover:underline"
								>
									{company.email}
								</a>
							</div>
						)}
						{company.contactNumber && (
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<a
									href={`tel:${company.contactNumber}`}
									className="text-sm hover:underline"
								>
									{company.contactNumber}
								</a>
							</div>
						)}
						{company.website && (
							<div className="flex items-center gap-2">
								<Globe className="h-4 w-4 text-muted-foreground" />
								<a
									href={company.website}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm hover:underline"
								>
									{company.website}
								</a>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Location */}
				{company.location && (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<MapPin className="h-5 w-5" />
								{t("location")}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="text-sm">
								<span className="text-muted-foreground">
									{tLoc("country")}:{" "}
								</span>
								<span className="font-medium">{company.location.country}</span>
							</div>
							{company.location.canton && (
								<div className="text-sm">
									<span className="text-muted-foreground">
										{tLoc("region")}:{" "}
									</span>
									<span className="font-medium">{company.location.canton}</span>
								</div>
							)}
							{company.location.municipality && (
								<div className="text-sm">
									<span className="text-muted-foreground">
										{tLoc("municipality")}:{" "}
									</span>
									<span className="font-medium">
										{company.location.municipality}
									</span>
								</div>
							)}
						</CardContent>
					</Card>
				)}
			</div>

			<Separator className="my-6" />

			{/* Job Posts */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Briefcase className="h-5 w-5" />
						{t("activeJobPosts")} ({company.jobs.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					{company.jobs.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-muted-foreground">{t("noJobPosts")}</p>
						</div>
					) : (
						<div className="space-y-4">
							{company.jobs.map((job) => (
								<Card
									key={job.id}
									className="hover:shadow-md transition-shadow"
								>
									<CardContent className="pt-6">
										<div className="flex justify-between items-start mb-3">
											<div className="flex-1">
												<h3 className="font-semibold text-lg mb-2">
													{job.title}
												</h3>
												{job.description && (
													<p className="text-sm text-muted-foreground line-clamp-2 mb-3">
														{job.description}
													</p>
												)}
											</div>
										</div>

										<div className="flex flex-wrap gap-2 mb-4">
											{job.location && (
												<Badge variant="outline" className="text-xs">
													<MapPin className="h-3 w-3 mr-1" />
													{job.location.municipality || job.location.canton}
												</Badge>
											)}
											<Badge variant="secondary" className="text-xs">
												<Users className="h-3 w-3 mr-1" />
												{job._count.applications} {t("applicants")}
											</Badge>
										</div>

										<Button asChild className="w-full">
											<Link href={`/job-post/${job.id}`}>
												{t("viewJobPost")}
											</Link>
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
