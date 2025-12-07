"use client";

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
import { Link } from "@/i18n/routing";
import { type LoginFormSchema, loginFormSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStackApp } from "@stackframe/stack";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
	const t = useTranslations("auth.login");
	const app = useStackApp();
	const [loginError, setLoginError] = useState<string | null>(null);

	const form = useForm<LoginFormSchema>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const loginUser: SubmitHandler<LoginFormSchema> = async (data) => {
		try {
			const login = await app.signInWithCredential({
				email: data.email,
				password: data.password,
			});

			if (login.error) {
				setLoginError(login.error.humanReadableMessage);
			}
		} catch (error) {
			console.log("Errore durante il login:", error);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(loginUser)}
					className="space-y-2  max-w-sm w-full"
				>
					<div>
						<h1 className=" text-2xl font-semibold">{t("title")}</h1>
						<p className="text-muted-foreground">{t("subtitle")}</p>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("email")}</FormLabel>
								<FormControl>
									<Input placeholder={t("email")} {...field} type="email" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("password")}</FormLabel>
								<FormControl>
									<Input
										placeholder={t("password")}
										{...field}
										type="password"
									/>
								</FormControl>
								<a
									href="/handler/forgot-password"
									className="text-xs float-right mt-2"
								>
									{t("forgotPassword")}
								</a>
								<FormMessage />
							</FormItem>
						)}
					/>
					{loginError && <p className="text-red-500">{loginError}</p>}
					<Button
						type="submit"
						disabled={form.formState.isSubmitting}
						className="w-full"
					>
						{form.formState.isSubmitting ? (
							<Loader2 className="animate-spin" />
						) : (
							t("loginButton")
						)}
					</Button>
					<Button variant="outline" role="button" asChild className="w-full">
						<Link href="/register">{t("registerButton")}</Link>
					</Button>
				</form>
			</Form>
		</div>
	);
}
