import type { Company } from "@prisma/client";
import CompanyDetail from "@/components/company-detail";
import { getCompanyById } from "@/services/company-service";

export default async function Page({ params }: { params: { id: string } }) {
	const company: Company = await getCompanyById(params.id);

	if (company?.id) {
		return (
			<div className="mx-auto container max-w-md">
				<CompanyDetail company={company} />
			</div>
		);
	} else {
		return "non abbiamo trovato questa azienda";
	}
}
