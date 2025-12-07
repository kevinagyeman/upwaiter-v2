import type { Company } from "@prisma/client";
import React from "react";

type CompanyDetailProps = {
	company: Company;
};

export default function CompanyDetail({ company }: CompanyDetailProps) {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">{company.name}</h1>
			<p className="text-muted-foreground">{company.about}</p>
			<p>{company.website}</p>
			<p>{company.vatNumber}</p>
		</div>
	);
}
