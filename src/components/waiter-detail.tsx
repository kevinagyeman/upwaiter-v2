"use client";

import type { Location, Waiter } from "@prisma/client";
import {
	Briefcase,
	Calendar,
	CheckCircle2,
	Languages,
	Mail,
	MapPin,
	Phone,
	User,
	XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type WaiterWithLocation = Waiter & {
	location: Location | null;
};

type WaiterDetailProps = {
	waiter: WaiterWithLocation;
};

export default function WaiterDetail({ waiter }: WaiterDetailProps) {
	const t = useTranslations("waiter.profile");
	const tLoc = useTranslations("location");

	// Calculate age from date of birth
	const calculateAge = (dateOfBirth: Date | null) => {
		if (!dateOfBirth) return null;
		const today = new Date();
		const birthDate = new Date(dateOfBirth);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}
		return age;
	};

	const age = calculateAge(waiter.dateOfBirth);

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			{/* Waiter Header */}
			<Card className="mb-6">
				<CardHeader>
					<div className="flex items-start gap-4">
						<div className="rounded-full bg-primary/10 p-4">
							<User className="h-8 w-8 text-primary" />
						</div>
						<div className="flex-1">
							<div className="flex items-center gap-3 mb-2">
								<CardTitle className="text-3xl">
									{waiter.firstName} {waiter.lastName}
								</CardTitle>
								{waiter.isAvailableToWork ? (
									<Badge variant="default" className="gap-1">
										<CheckCircle2 className="h-3 w-3" />
										{t("available")}
									</Badge>
								) : (
									<Badge variant="secondary" className="gap-1">
										<XCircle className="h-3 w-3" />
										{t("notAvailable")}
									</Badge>
								)}
							</div>
							{waiter.about && (
								<p className="text-muted-foreground text-lg">
									{waiter.about}
								</p>
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
						{waiter.email && (
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<a
									href={`mailto:${waiter.email}`}
									className="text-sm hover:underline"
								>
									{waiter.email}
								</a>
							</div>
						)}
						{waiter.contactNumber && (
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<a
									href={`tel:${waiter.contactNumber}`}
									className="text-sm hover:underline"
								>
									{waiter.contactNumber}
								</a>
							</div>
						)}
						{age && (
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">
									{age} {t("yearsOld")}
								</span>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Location */}
				{waiter.location && (
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
								<span className="font-medium">{waiter.location.country}</span>
							</div>
							{waiter.location.canton && (
								<div className="text-sm">
									<span className="text-muted-foreground">
										{tLoc("region")}:{" "}
									</span>
									<span className="font-medium">{waiter.location.canton}</span>
								</div>
							)}
							{waiter.location.municipality && (
								<div className="text-sm">
									<span className="text-muted-foreground">
										{tLoc("municipality")}:{" "}
									</span>
									<span className="font-medium">
										{waiter.location.municipality}
									</span>
								</div>
							)}
							{waiter.streetAddress && (
								<div className="text-sm">
									<span className="text-muted-foreground">
										{t("address")}:{" "}
									</span>
									<span className="font-medium">{waiter.streetAddress}</span>
								</div>
							)}
						</CardContent>
					</Card>
				)}
			</div>

			<Separator className="my-6" />

			{/* Professional Information */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Briefcase className="h-5 w-5" />
						{t("professionalInfo")}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Years of Experience */}
					{waiter.yearsOfExperience !== null &&
						waiter.yearsOfExperience !== undefined && (
							<div>
								<div className="flex items-center gap-2 mb-2">
									<Briefcase className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm font-medium">
										{t("yearsOfExperience")}
									</span>
								</div>
								<p className="text-muted-foreground ml-6">
									{waiter.yearsOfExperience}{" "}
									{waiter.yearsOfExperience === 1 ? t("year") : t("years")}
								</p>
							</div>
						)}

					{/* Languages */}
					{(waiter.firstLanguage ||
						waiter.secondLanguage ||
						waiter.thirdLanguage) && (
						<div>
							<div className="flex items-center gap-2 mb-2">
								<Languages className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm font-medium">{t("languages")}</span>
							</div>
							<div className="flex flex-wrap gap-2 ml-6">
								{waiter.firstLanguage && (
									<Badge variant="outline">{waiter.firstLanguage}</Badge>
								)}
								{waiter.secondLanguage && (
									<Badge variant="outline">{waiter.secondLanguage}</Badge>
								)}
								{waiter.thirdLanguage && (
									<Badge variant="outline">{waiter.thirdLanguage}</Badge>
								)}
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
