"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { deleteApplication } from "@/services/application-service";
import {
	deleteJobPost,
	getJobPostsByCompanyId,
} from "@/services/job-post-service";
import type { ApplicationSchema } from "@/types/application-schema-type";
import { useUser } from "@stackframe/stack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Briefcase,
	Calendar,
	CheckCircle2,
	ExternalLink,
	Languages,
	Mail,
	Phone,
	Trash2,
	User,
	XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

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
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				{t("loading")}
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">{t("title")}</h1>
			</div>

			<div className="space-y-6">
				{companyJobPosts?.jobPosts.map((job, index: number) => (
					<div
						key={job.id}
						className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
					>
						<div className="flex justify-between items-start mb-4">
							<div>
								<h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
								<p className="text-muted-foreground">{job.description}</p>
							</div>
							<div className="flex gap-2">
								<Link href={`/job-post/${job.id}`}>
									<Button variant="outline" size="sm">
										{t("viewJobPost")}
									</Button>
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

						<Separator className="my-4" />

						<div>
							<p className="text-sm font-semibold mb-3">
								{t("applicationsCount")} {job.applicationsCount}
							</p>

							{job.applications && job.applications.length > 0 && (
								<div className="space-y-2">
									<p className="text-sm font-medium mb-2">
										{t("applicationsList")}
									</p>
									<div className="grid gap-2">
										{job.applications.map((application: ApplicationSchema) => (
											<WaiterDetails
												key={application.id}
												application={application}
											/>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

interface WaiterDetailsProps {
	application: ApplicationSchema;
}

const WaiterDetails = ({ application }: WaiterDetailsProps) => {
	const t = useTranslations("company.myJobPosts");
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const rejectMutation = useMutation({
		mutationFn: (applicationId: string) => deleteApplication(applicationId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["companyJobPosts"],
			});
			setOpen(false);
		},
	});

	const handleReject = () => {
		if (window.confirm(t("confirmReject"))) {
			rejectMutation.mutate(application.id);
		}
	};

	const waiter = application.waiter;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="w-full justify-start text-left h-auto py-3"
				>
					<div className="flex items-center gap-3 w-full">
						<div className="rounded-full bg-primary/10 p-2">
							<User className="h-4 w-4" />
						</div>
						<div className="flex-1">
							<p className="font-medium">
								{waiter.firstName} {waiter.lastName}
							</p>
							<p className="text-sm text-muted-foreground">{waiter.email}</p>
						</div>
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl">
						{waiter.firstName} {waiter.lastName}
					</DialogTitle>
					<DialogDescription>{t("applicantInfo")}</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* Contact Information Section */}
					<div className="space-y-3">
						<h3 className="font-semibold text-sm uppercase text-muted-foreground">
							Contact Information
						</h3>
						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
								<div className="flex-1">
									<p className="text-sm font-medium text-muted-foreground">
										{t("email")}
									</p>
									<p className="text-sm">{waiter.email}</p>
								</div>
							</div>

							{waiter.contactNumber && (
								<div className="flex items-start gap-3">
									<Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div className="flex-1">
										<p className="text-sm font-medium text-muted-foreground">
											{t("contactNumber")}
										</p>
										<p className="text-sm">{waiter.contactNumber}</p>
									</div>
								</div>
							)}

							{waiter.dateOfBirth && (
								<div className="flex items-start gap-3">
									<Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div className="flex-1">
										<p className="text-sm font-medium text-muted-foreground">
											{t("dateOfBirth")}
										</p>
										<p className="text-sm">
											{new Date(waiter.dateOfBirth).toLocaleDateString()}
										</p>
									</div>
								</div>
							)}
						</div>
					</div>

					<Separator />

					{/* Professional Information Section */}
					<div className="space-y-3">
						<h3 className="font-semibold text-sm uppercase text-muted-foreground">
							Professional Information
						</h3>
						<div className="space-y-3">
							{waiter.yearsOfExperience !== undefined && (
								<div className="flex items-start gap-3">
									<Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div className="flex-1">
										<p className="text-sm font-medium text-muted-foreground">
											{t("yearsOfExperience")}
										</p>
										<p className="text-sm">
											{waiter.yearsOfExperience}{" "}
											{waiter.yearsOfExperience === 1 ? "year" : "years"}
										</p>
									</div>
								</div>
							)}

							{(waiter.firstLanguage ||
								waiter.secondLanguage ||
								waiter.thirdLanguage) && (
								<div className="flex items-start gap-3">
									<Languages className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div className="flex-1">
										<p className="text-sm font-medium text-muted-foreground">
											{t("languages")}
										</p>
										<div className="flex flex-wrap gap-2 mt-1">
											{waiter.firstLanguage && (
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
													{waiter.firstLanguage}
												</span>
											)}
											{waiter.secondLanguage && (
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
													{waiter.secondLanguage}
												</span>
											)}
											{waiter.thirdLanguage && (
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
													{waiter.thirdLanguage}
												</span>
											)}
										</div>
									</div>
								</div>
							)}

							<div className="flex items-start gap-3">
								{waiter.isAvailableToWork ? (
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
								) : (
									<XCircle className="h-5 w-5 text-red-600 mt-0.5" />
								)}
								<div className="flex-1">
									<p className="text-sm font-medium text-muted-foreground">
										{t("availability")}
									</p>
									<p
										className={`text-sm font-medium ${
											waiter.isAvailableToWork
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{waiter.isAvailableToWork
											? t("available")
											: t("notAvailable")}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* About Section */}
					{waiter.about && (
						<>
							<Separator />
							<div className="space-y-2">
								<h3 className="font-semibold text-sm uppercase text-muted-foreground">
									{t("about")}
								</h3>
								<p className="text-sm leading-relaxed">{waiter.about}</p>
							</div>
						</>
					)}

					<Separator />

					{/* View Full Profile Link */}
					<Button asChild variant="outline" className="w-full">
						<Link href={`/waiter/${waiter.id}`} target="_blank">
							<ExternalLink className="h-4 w-4 mr-2" />
							{t("viewFullProfile")}
						</Link>
					</Button>
				</div>

				<DialogFooter className="flex gap-2">
					<DialogClose asChild>
						<Button variant="outline">{t("close")}</Button>
					</DialogClose>
					<Button
						variant="destructive"
						onClick={handleReject}
						disabled={rejectMutation.isPending}
					>
						<Trash2 className="h-4 w-4 mr-2" />
						{rejectMutation.isPending ? t("rejecting") : t("rejectApplication")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
