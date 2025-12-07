"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStackApp } from "@stackframe/stack";
import { Loader2 } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
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

export default function CreateJobPost() {
	const { location, clearLocation } = useLocationStore();
	const app = useStackApp();

	const form = useForm<JobPostFormSchema>({
		resolver: zodResolver(jobPostFormSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const publishJobPost: SubmitHandler<JobPostFormSchema> = async (data) => {
		try {
			console.log("location", location);
			console.log("data", data);
			const user = await app.getUser();
			if (user) {
				let locationId: string | undefined;

				if (location) {
					const createdLocation: any = await createLocation(location);
					locationId = createdLocation.id;
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
			console.log("Errore durante la creazione del jobpost:", error);
		}
	};

	return (
		<>
			<div className="flex flex-col items-center">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(publishJobPost)}
						className="space-y-2  max-w-sm w-full"
					>
						<div>
							<h1 className=" text-2xl font-semibold">
								Crea annuncio di lavoro
							</h1>
							<p className="text-muted-foreground">crea annuncio di lavoro</p>
						</div>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{field.name}</FormLabel>
									<FormControl>
										<Input placeholder={field.name} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<LocationForm />
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{field.name}</FormLabel>
									<FormControl>
										<Textarea placeholder={field.name} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							role="submit"
							// disabled={
							//   form.formState.isSubmitting || !isLocationValid(location)
							// }
							className="w-full"
						>
							{form.formState.isSubmitting ? (
								<Loader2 className="animate-spin" />
							) : (
								"Pubblica annuncio"
							)}
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
}
