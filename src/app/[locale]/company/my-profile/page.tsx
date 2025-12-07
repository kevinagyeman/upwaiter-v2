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
	type CompanyFormSchema,
	companyFormSchema,
} from "@/schemas/company-schema";
import { getCompanyById, updateCompany } from "@/services/company-service";
import { createLocation, updateLocation } from "@/services/location-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@stackframe/stack";
import { Eye, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

export default function MyProfile() {
	const t = useTranslations("company.myProfile");
	const user = useUser();
	const [companyDataState, setCompanyDataState] = useState();

	useEffect(() => {
		getCompanyData();
	}, [user]);

	const getCompanyData = async () => {
		if (user) {
			const company: CompanyFormSchema = await getCompanyById(user.id);
			setCompanyDataState(company);
			console.log(company);

			form.reset({
				name: company.name || "",
				email: company.email || "",
				vatNumber: company.vatNumber || "",
				contactNumber: company.contactNumber || undefined,
				website: company.website || undefined,
				about: company.about || undefined,
				location: {
					country: "Italy",
					isoCode: "IT",
					region: company?.location?.region || undefined,
					province: company?.location?.province || undefined,
					municipality: company?.location?.municipality || undefined,
				},
			});
		}
	};

	const form = useForm<CompanyFormSchema>({
		resolver: zodResolver(companyFormSchema),
		defaultValues: {
			name: "",
			email: "",
			vatNumber: "",
			contactNumber: "",
			website: "",
			about: "",
			location: {
				country: "Italy",
				isoCode: "IT",
				region: undefined,
				province: undefined,
				municipality: undefined,
			},
		},
	});

	const updateCompanyData: SubmitHandler<CompanyFormSchema> = async (data) => {
		console.log(data);

		try {
			if (user) {
				let locationId = companyDataState.locationId;

				if (!locationId) {
					const newLocation = await createLocation(data.location);

					if (!newLocation || !newLocation.id) {
						throw new Error("Errore nella creazione della location");
					}

					locationId = newLocation.id;
				} else {
					await updateLocation(locationId, data.location);
				}

				// Prepara i dati per l'aggiornamento della company, includendo la locationId
				const companyData = {
					name: data.name,
					email: data.email,
					vatNumber: data.vatNumber,
					contactNumber: data.contactNumber,
					website: data.website,
					about: data.about,
					locationId: locationId || null, // Associazione con la location
				};

				// Aggiorna la company con la location associata
				const updatedCompany = await updateCompany(user.id, companyData);

				console.log(
					"Azienda e location aggiornate con successo:",
					updatedCompany,
				);
			}
		} catch (error) {
			console.error(
				"Errore durante l’aggiornamento della company o la creazione della location:",
				error,
			);
		}
	};

	return (
		<div className="mx-auto max-w-sm px-2">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(updateCompanyData)}
					className="flex flex-col gap-2"
				>
					<div>
						<h1 className=" text-2xl font-semibold">{t("title")}</h1>
					</div>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("name")}</FormLabel>
								<FormControl>
									<Input placeholder={t("name")} {...field} />
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
								<FormLabel>{t("email")}</FormLabel>
								<FormControl>
									<Input placeholder={t("email")} {...field} disabled />
								</FormControl>
								<a href="/" className="text-xs float-right mt-2">
									{t("changeEmail")}
								</a>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="vatNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("vatNumber")}</FormLabel>
								<FormControl>
									<Input placeholder={t("vatNumber")} {...field} disabled />
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
								<FormLabel>{t("contactNumber")}</FormLabel>
								<FormControl>
									<Input placeholder={t("contactNumber")} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="website"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("website")}</FormLabel>
								<FormControl>
									<Input placeholder={t("website")} {...field} />
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
								<FormLabel>{t("about")}</FormLabel>
								<FormControl>
									<Textarea placeholder={t("about")} {...field} rows={5} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<LocationForm
						form={form}
						region={companyDataState?.location?.region}
						province={companyDataState?.location?.province}
						municipality={companyDataState?.location?.municipality}
					/>
					<Button
						type="submit"
						disabled={form.formState.isSubmitting}
						className="w-full"
					>
						{form.formState.isSubmitting ? (
							<Loader2 className="animate-spin" />
						) : (
							t("updateProfile")
						)}
					</Button>
					<Button asChild variant={"ghost"} className="w-full">
						<Link href={`/company/${user?.id}`}>
							{t("viewProfile")} <Eye />
						</Link>
					</Button>
				</form>
			</Form>
		</div>
	);
}
