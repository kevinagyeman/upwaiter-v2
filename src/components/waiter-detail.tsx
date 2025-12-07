import type { Waiter } from "@prisma/client";
import React from "react";

type WaiterDetailProps = {
	waiter: Waiter;
};

export default function WaiterDetail({ waiter }: WaiterDetailProps) {
	return (
		<div className="flex flex-col gap-4">
			<h1>
				{waiter.firstName} {waiter.lastName}
			</h1>
		</div>
	);
}
