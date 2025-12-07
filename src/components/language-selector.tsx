"use client";

import {
	type Locale,
	supportedLocales,
	usePathname,
	useRouter,
} from "@/i18n/routing";
import { useLocale } from "next-intl";
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

	const selectLanguage = (selectedLocale: string) => {
		router.replace(pathname, { locale: selectedLocale as Locale });
	};

	return (
		<Select onValueChange={selectLanguage} value={locale}>
			<SelectTrigger
				className="mx-1 w-[60px] border-none bg-transparent focus:border-transparent focus:ring-transparent"
				aria-label="Language selector"
			>
				<SelectValue placeholder="Select a a language" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{supportedLocales.map((locale: Locale) => (
						<SelectItem value={locale} key={locale} className="cursor-pointer">
							{locale.slice(-2)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
