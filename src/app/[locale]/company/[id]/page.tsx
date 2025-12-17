import CompanyDetail from "@/components/company-detail";
import { Card, CardContent } from "@/components/ui/card";
import { getCompanyById } from "@/services/company-service";
import { Building2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string; locale: string }>;
}) {
	const { id } = await params;
	const company = await getCompanyById(id);
	const t = await getTranslations("company.profile");

	if (!company?.id) {
		return (
			<div className="container mx-auto px-4 py-8 max-w-md">
				<Card>
					<CardContent className="pt-6">
						<div className="flex flex-col items-center gap-4 text-center">
							<div className="rounded-full bg-muted p-4">
								<Building2 className="h-8 w-8 text-muted-foreground" />
							</div>
							<div>
								<h2 className="text-xl font-semibold mb-2">
									{t("notFound")}
								</h2>
								<p className="text-muted-foreground">
									{t("notFoundDescription")}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return <CompanyDetail company={company} />;
}
