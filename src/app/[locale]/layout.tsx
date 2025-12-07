import { DataLoading } from "@/components/data-loading";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import ReactQueryProvider from "@/utils/providers/react-query-provider";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { stackServerApp } from "../../stack";
import "../globals.css";

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: Locale };
}) {
	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as Locale)) {
		notFound();
	}
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<StackProvider app={stackServerApp} lang={locale}>
							<StackTheme>
								<Suspense fallback={<DataLoading />}>
									<ReactQueryProvider>
										<Navbar />
										{children}
									</ReactQueryProvider>
								</Suspense>
							</StackTheme>
						</StackProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
