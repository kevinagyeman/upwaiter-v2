"use client";

import type { Waiter } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
	Briefcase,
	CheckCircle2,
	Filter,
	Languages,
	MapPin,
	User,
	XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { getWaiters } from "@/services/waiter-service";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

export default function WaitersList() {
	const t = useTranslations("company.waiters");
	const tLoc = useTranslations("location");
	const searchParams = useSearchParams();
	const router = useRouter();
	const observer = useRef<IntersectionObserver | null>(null);

	// Filter state
	const [minExperience, setMinExperience] = useState("");
	const [language, setLanguage] = useState("");
	const [availableOnly, setAvailableOnly] = useState(false);

	const region = searchParams.get("region") ?? undefined;
	const province = searchParams.get("province") ?? undefined;
	const municipality = searchParams.get("municipality") ?? undefined;

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["waiters", region, province, municipality],
			queryFn: ({ pageParam = 1 }) =>
				getWaiters(pageParam, 12, { region, province, municipality }),
			getNextPageParam: (lastPage, allPages) =>
				lastPage.waiters.length > 0 ? allPages.length + 1 : undefined,
			initialPageParam: 1,
		});

	const waitersList = data?.pages.flatMap((page) => page.waiters) || [];

	// Client-side filtering
	const filteredWaiters = waitersList.filter((waiter: Waiter) => {
		if (
			minExperience &&
			(waiter.yearsOfExperience || 0) < Number.parseInt(minExperience)
		) {
			return false;
		}
		if (
			language &&
			![
				waiter.firstLanguage,
				waiter.secondLanguage,
				waiter.thirdLanguage,
			].includes(language)
		) {
			return false;
		}
		if (availableOnly && !waiter.isAvailableToWork) {
			return false;
		}
		return true;
	});

	const lastWaiterRef = (node: HTMLDivElement | null) => {
		if (isFetchingNextPage || !hasNextPage) return;
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) fetchNextPage();
		});

		if (node) observer.current.observe(node);
	};

	const handleClearFilters = () => {
		setMinExperience("");
		setLanguage("");
		setAvailableOnly(false);
		router.push("/company/waiters");
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
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
				<div>
					<h1 className="text-3xl font-bold">{t("title")}</h1>
					<p className="text-muted-foreground mt-1">{t("subtitle")}</p>
				</div>

				{/* Filters Button */}
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="lg">
							<Filter className="h-4 w-4 mr-2" />
							{t("filters")}
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>{t("filters")}</SheetTitle>
							<SheetDescription>{t("subtitle")}</SheetDescription>
						</SheetHeader>

						<div className="space-y-6 py-6">
							{/* Experience Filter */}
							<div className="space-y-2">
								<Label>{t("yearsOfExperience")}</Label>
								<Select value={minExperience} onValueChange={setMinExperience}>
									<SelectTrigger>
										<SelectValue placeholder={t("anyExperience")} />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="none">{t("anyExperience")}</SelectItem>
										<SelectItem value="1">1+ {t("years")}</SelectItem>
										<SelectItem value="2">2+ {t("years")}</SelectItem>
										<SelectItem value="3">3+ {t("years")}</SelectItem>
										<SelectItem value="5">5+ {t("years")}</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Language Filter */}
							<div className="space-y-2">
								<Label>{t("languages")}</Label>
								<Input
									placeholder={t("anyLanguage")}
									value={language}
									onChange={(e) => setLanguage(e.target.value)}
								/>
							</div>

							{/* Availability Filter */}
							<div className="flex items-center space-x-2">
								<Checkbox
									id="available"
									checked={availableOnly}
									onCheckedChange={(checked) =>
										setAvailableOnly(checked as boolean)
									}
								/>
								<Label htmlFor="available" className="cursor-pointer">
									{t("availableOnly")}
								</Label>
							</div>
						</div>

						<div className="flex gap-2">
							<SheetClose asChild>
								<Button variant="outline" className="flex-1">
									{t("applyFilters")}
								</Button>
							</SheetClose>
							<Button
								variant="ghost"
								onClick={handleClearFilters}
								className="flex-1"
							>
								{t("clearFilters")}
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>

			{/* Active Filters Display */}
			{(minExperience || language || availableOnly) && (
				<div className="flex flex-wrap gap-2 mb-6">
					{minExperience && (
						<Badge variant="secondary" className="text-sm py-1">
							{t("experience")}: {minExperience}+ {t("years")}
						</Badge>
					)}
					{language && (
						<Badge variant="secondary" className="text-sm py-1">
							{t("languages")}: {language}
						</Badge>
					)}
					{availableOnly && (
						<Badge variant="secondary" className="text-sm py-1">
							{t("available")}
						</Badge>
					)}
				</div>
			)}

			{/* Waiters Grid */}
			{filteredWaiters.length === 0 ? (
				<Card className="text-center py-12">
					<CardContent>
						<div className="flex flex-col items-center gap-4">
							<div className="rounded-full bg-muted p-4">
								<User className="h-8 w-8 text-muted-foreground" />
							</div>
							<div>
								<h2 className="text-xl font-semibold mb-2">
									{t("noWaitersFound")}
								</h2>
								<p className="text-muted-foreground mb-4">
									{t("tryDifferentFilters")}
								</p>
								<Button onClick={handleClearFilters}>
									{t("clearFilters")}
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredWaiters.map((waiter: Waiter, index: number) => (
						<Card
							key={waiter.id}
							className="hover:shadow-lg transition-shadow"
							ref={index === filteredWaiters.length - 1 ? lastWaiterRef : null}
						>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div className="flex items-center gap-3">
										<div className="rounded-full bg-primary/10 p-3">
											<User className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold text-lg">
												{waiter.firstName} {waiter.lastName}
											</h3>
											{waiter.yearsOfExperience !== undefined &&
												waiter.yearsOfExperience > 0 && (
													<p className="text-sm text-muted-foreground">
														{waiter.yearsOfExperience} {t("years")}{" "}
														{t("experience")}
													</p>
												)}
										</div>
									</div>
									{waiter.isAvailableToWork ? (
										<CheckCircle2 className="h-5 w-5 text-green-600" />
									) : (
										<XCircle className="h-5 w-5 text-gray-400" />
									)}
								</div>
							</CardHeader>

							<CardContent className="space-y-3">
								{/* Languages */}
								{(waiter.firstLanguage ||
									waiter.secondLanguage ||
									waiter.thirdLanguage) && (
									<div className="flex items-start gap-2">
										<Languages className="h-4 w-4 text-muted-foreground mt-1" />
										<div className="flex flex-wrap gap-1">
											{waiter.firstLanguage && (
												<Badge variant="outline" className="text-xs">
													{waiter.firstLanguage}
												</Badge>
											)}
											{waiter.secondLanguage && (
												<Badge variant="outline" className="text-xs">
													{waiter.secondLanguage}
												</Badge>
											)}
											{waiter.thirdLanguage && (
												<Badge variant="outline" className="text-xs">
													{waiter.thirdLanguage}
												</Badge>
											)}
										</div>
									</div>
								)}

								{/* About */}
								{waiter.about && (
									<p className="text-sm text-muted-foreground line-clamp-2">
										{waiter.about}
									</p>
								)}

								{/* Availability Status */}
								<div className="flex items-center gap-2">
									{waiter.isAvailableToWork ? (
										<Badge variant="default" className="text-xs">
											{t("available")}
										</Badge>
									) : (
										<Badge variant="secondary" className="text-xs">
											{t("notAvailable")}
										</Badge>
									)}
								</div>
							</CardContent>

							<CardFooter>
								<Button asChild className="w-full">
									<Link href={`/waiter/${waiter.id}`}>{t("viewProfile")}</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}

			{/* Loading More Indicator */}
			{isFetchingNextPage && (
				<div className="text-center mt-8">
					<p className="text-muted-foreground">{t("loadingMore")}</p>
				</div>
			)}
		</div>
	);
}
