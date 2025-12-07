"use client";

import { useUser } from "@stackframe/stack";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";

export default function VerifyAccountModal() {
	const user = useUser();
	const pathname = usePathname();
	const [isEmailSended, setIsEmailSended] = useState(false);
	const [countdown, setCountdown] = useState(30);

	const isOnVerificationPage = pathname === "/handler/email-verification";
	const isUserUnverified = user && !user?.primaryEmailVerified;
	const shouldShowModal = isUserUnverified && !isOnVerificationPage;

	const sendEmail = async () => {
		try {
			await user?.sendVerificationEmail();
			setIsEmailSended(true);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			await user?.signOut();
		} catch (error) {
			console.log(error);
		}
	};

	// Refresh user data periodically to check if email was verified
	useEffect(() => {
		if (!shouldShowModal) return;

		const refreshInterval = setInterval(async () => {
			await user?.update();
		}, 3000); // Check every 3 seconds

		return () => clearInterval(refreshInterval);
	}, [shouldShowModal, user]);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isEmailSended) {
			setCountdown(30);
			timer = setInterval(() => {
				setCountdown((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						setIsEmailSended(false);
						return 30;
					}
					return prev - 1;
				});
			}, 1000);
		}

		return () => clearInterval(timer);
	}, [isEmailSended]);

	return (
		<Dialog open={shouldShowModal}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Il tuo account non è verificato</DialogTitle>
					<DialogDescription>
						Verifica la mail attraverso il link che ti abbiamo inviato per
						accedere al portale
					</DialogDescription>
				</DialogHeader>
				<p>{user?.primaryEmail}</p>
				{!isEmailSended ? (
					<Button onClick={sendEmail}>Invia email di verifica</Button>
				) : (
					<p>La mail può essere inviata di nuovo fra {countdown} secondi.</p>
				)}
				<Button
					variant={"secondary"}
					size={"sm"}
					className={"w-fit"}
					onClick={() => logout()}
				>
					Logout
				</Button>
			</DialogContent>
		</Dialog>
	);
}
