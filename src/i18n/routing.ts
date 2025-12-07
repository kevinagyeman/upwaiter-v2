import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const supportedLocales = ["en-US", "it-IT"] as const;

export type Locale = (typeof supportedLocales)[number];

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: supportedLocales,

	// Used when no locale matches
	defaultLocale: "en-US",
	localePrefix: "never",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);
