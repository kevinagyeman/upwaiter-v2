import CompanyDashboard from "@/components/company-dashboard";
import JobPosts from "@/components/job-posts";
import { Button } from "@/components/ui/button";
import { stackServerApp } from "@/stack";

export default async function Page() {
	const app = stackServerApp;
	const user = await app.getUser();

	if (user?.clientMetadata.role === "company") {
		return <CompanyDashboard />;
	}

	return (
		<div className="mx-auto container flex justify-between">
			<div className="hidden lg:flex flex-col gap-4 mt-2">
				<h4 className="text-2xl font-bold">I più cercati</h4>
				<Button variant={"secondary"} className="w-fit">
					Zurich
				</Button>
				<Button variant={"secondary"} className="w-fit">
					Svizzera
				</Button>
				<Button variant={"secondary"} className="w-fit">
					Locarno
				</Button>
				<Button variant={"secondary"} className="w-fit">
					Zurigo
				</Button>
				<Button variant={"secondary"} className="w-fit">
					Geneva
				</Button>
			</div>
			<div className="max-w-lg">
				<JobPosts />
			</div>
			<div className="hidden lg:flex flex-col gap-4 mt-2 items-end">
				<h4 className="text-2xl font-bold">Sei una azienda?</h4>
				<Button variant={"secondary"} className="w-fit">
					Scopri di più
				</Button>
			</div>
		</div>
	);
}
