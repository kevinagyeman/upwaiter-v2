import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import LocationForm from "./location-form";

export function JobPostsFilter() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			location: {
				country: "Italy",
				region: "",
				province: "",
				municipality: "",
			},
		},
	});
	const filter = () => {
		const formData = form.getValues();
		const region = formData.location?.region || "";
		const province = formData.location?.province || "";
		const municipality = formData.location?.municipality || "";

		router.push(
			`?region=${region}&province=${province}&municipality=${municipality}`,
		);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={"secondary"}>
					Filtra <SlidersHorizontal />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col gap-4 max-w-md min-w-sm">
				<SheetHeader>
					<SheetTitle>Filrta gli annunci</SheetTitle>
					<SheetDescription>Filtra gli annunci</SheetDescription>
				</SheetHeader>
				<Form {...form}>
					<LocationForm form={form} />
					<div className="flex gap-4">
						<Button onClick={filter} className="flex-1">
							Cerca annunci
						</Button>
						<Button onClick={() => router.push("/")} variant={"secondary"}>
							Cancella filtri
						</Button>
					</div>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
