"use client";

import { useTranslations } from "next-intl";
import { Spinner } from "./ui/spinner";

export function DataLoading() {
	const t = useTranslations("common");
	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
			<Spinner className="h-8 w-8" />
			<p className="text-muted-foreground">{t("loading")}</p>
		</div>
	);
}
