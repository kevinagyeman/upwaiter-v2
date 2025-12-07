import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
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
	const filter = () => {
		router.push(
			`?canton=${location?.canton}&?district=${location?.district}&municipality=${location?.municipality}`,
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
				<LocationForm />
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
