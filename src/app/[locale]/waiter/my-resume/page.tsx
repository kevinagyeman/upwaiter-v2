"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStackApp, useUser } from "@stackframe/stack";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
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
	type WaiterFormSchema,
	waiterFormSchema,
} from "@/schemas/waiter-schema";
import { getWaiterById, updateWaiter } from "@/services/waiter-service";
import { useUserStore } from "@/store/user";

export default function MyResume() {
	const app = useStackApp();
	const user = useUser();

	useEffect(() => {
		getWaiterData();
	}, [user]);

	const getWaiterData = async () => {
		if (user) {
			const waiter: WaiterFormSchema = await getWaiterById(user.id);

			form.reset({
				firstName: waiter.firstName,
				lastName: waiter.lastName,
				email: waiter.email,
				contactNumber: waiter.contactNumber,
				about: waiter.about,
			});
		}
	};

	const form = useForm<WaiterFormSchema>({
		resolver: zodResolver(waiterFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			contactNumber: "",
			about: "",
		},
	});

	const updateWaiterData: SubmitHandler<WaiterFormSchema> = async (data) => {
		try {
			if (user) {
				const parsedData = {
					...data,
					dateOfBirth: data.dateOfBirth
						? new Date(data.dateOfBirth)
						: undefined,
				};

				await updateWaiter(user.id, parsedData);
			}
		} catch (error) {
			console.log("Errore durante la creazione del jobpost:", error);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<Button asChild>
				<Link href={`/waiter/${user?.id}`} prefetch>
					anteprima profilo
				</Link>
			</Button>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(updateWaiterData)}
					className="space-y-2  max-w-sm w-full"
				>
					<div>
						<h1 className=" text-2xl font-semibold">Modifica il tuo cv</h1>
						<p className="text-muted-foreground">
							Modifica il tuo profilo affinche le aziende possano
						</p>
					</div>
					<FormField
						control={form.control}
						name="firstName"
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
					<FormField
						control={form.control}
						name="lastName"
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
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{field.name}</FormLabel>
								<FormControl>
									<Input placeholder={field.name} {...field} disabled />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="contactNumber"
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
					<FormField
						control={form.control}
						name="about"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{field.name}</FormLabel>
								<FormControl>
									<Textarea placeholder={field.name} {...field} rows={5} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						disabled={form.formState.isSubmitting || !form.formState.isValid}
						className="w-full"
					>
						{form.formState.isSubmitting ? (
							<Loader2 className="animate-spin" />
						) : (
							"Aggiorna il mio profilo"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
