"use client";

import LocationForm from "@/components/location-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	type JobPostFormSchema,
	jobPostFormSchema,
} from "@/schemas/job-post-schema";
import { createJobPost } from "@/services/job-post-service";
import { createLocation } from "@/services/location-service";
import { useLocationStore } from "@/store/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStackApp } from "@stackframe/stack";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { type SubmitHandler, useForm } from "react-hook-form";

export default function CreateJobPost() {
	const t = useTranslations("company.createJobPost");
	const { location, clearLocation } = useLocationStore();
	const app = useStackApp();

	const form = useForm<JobPostFormSchema>({
		resolver: zodResolver(jobPostFormSchema),
		defaultValues: {
			title: "",
			description: "",
			location: {
				isoCode: "IT",
				country: "Italy",
				region: "",
				province: "",
				municipality: "",
			},
		},
	});

	const publishJobPost: SubmitHandler<JobPostFormSchema> = async (data) => {
		try {
			console.log("location data from form:", data.location);
			const user = await app.getUser();
			if (user) {
				let locationId: string | undefined;

				// Use location data from the form
				if (data.location) {
					const createdLocation = await createLocation(data.location);
					if (createdLocation?.id) {
						locationId = createdLocation.id;
					}
				}

				await createJobPost({
					companyId: user.id,
					title: data.title,
					description: data.description,
					locationId: locationId,
				});
			}
			form.reset();
			clearLocation();
		} catch (error) {
			console.log("Error creating job post:", error);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(publishJobPost)}
					className="space-y-2  max-w-sm w-full"
				>
					<div>
						<h1 className=" text-2xl font-semibold">{t("title")}</h1>
						<p className="text-muted-foreground">{t("title")}</p>
					</div>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("jobTitle")}</FormLabel>
								<FormControl>
									<Input placeholder={t("jobTitle")} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<LocationForm form={form} />
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("description")}</FormLabel>
								<FormControl>
									<Textarea placeholder={t("description")} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						// disabled={
						//   form.formState.isSubmitting || !isLocationValid(location)
						// }
						className="w-full"
					>
						{form.formState.isSubmitting ? (
							<Loader2 className="animate-spin" />
						) : (
							t("createButton")
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
