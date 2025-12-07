import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useLocationStore } from "@/store/location";
import LocationForm from "./location-form";

export function JobPostsFilter() {
	const { location } = useLocationStore();
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
		router.push(
			`?region=${location?.region}&province=${location?.province}&municipality=${location?.municipality}`,
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
				<LocationForm form={form} />
				<div className="flex gap-4">
					<Button onClick={filter} className="flex-1">
						Cerca annunci
					</Button>
					<Button onClick={() => router.push("/")} variant={"secondary"}>
						Cancella filtri
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
