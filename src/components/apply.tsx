"use client";

import { useStackApp } from "@stackframe/stack";
import React from "react";
import { createApplication } from "@/services/application-service";

export default function Apply({
	waiterId,
	jobPostId,
}: {
	waiterId: string;
	jobPostId: string;
}) {
	return (
		<button
			type="button"
			onClick={async () => await createApplication(waiterId, jobPostId)}
		>
			candidati
		</button>
	);
}
