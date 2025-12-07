"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { supportedLocales, usePathname, useRouter } from "@/i18n/routing";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function LanguageSelector() {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const [language, setLanguage] = useState<string>(locale);

	const selectLanguage = (e: any) => {
		router.replace(pathname, { locale: e.valueOf() });
	};

	return (
		<>
			<Select
				onValueChange={(e) => {
					selectLanguage(e);
				}}
				value={language}
			>
				<SelectTrigger
					className="mx-1 w-[60px] border-none bg-transparent focus:border-transparent focus:ring-transparent"
					aria-label="Language selector"
				>
					<SelectValue placeholder="Select a a language" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{supportedLocales.map((locale: string, index: number) => (
							<SelectItem value={locale} key={index} className="cursor-pointer">
								{locale.slice(-2)}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</>
	);
}
