import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
	getMunicipalitiesInProvince,
	getProvincesInRegion,
	getRegions,
} from "@/services/italy-service";
import type {
	Municipality,
	Province,
	Region,
} from "@/types/italian-location-type";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type LocationFormProps = {
	form: UseFormReturn<any>;
	isRequired?: boolean;
	region?: string;
	province?: string;
	municipality?: string;
};

export default function LocationForm({
	form,
	isRequired = false,
	region,
	province,
	municipality,
}: LocationFormProps) {
	const [regions, setRegions] = useState<Region[]>([]);
	const [provinces, setProvinces] = useState<Province[]>([]);
	const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getRegions();
			if (data) {
				setRegions(data);
			}
		};
		fetchData();
	}, []);

	const handleRegionChange = async (value: string) => {
		const selectedRegion = regions.find((r: Region) => r.name === value);
		if (!selectedRegion) return;

		form.setValue("location.region", selectedRegion.name);
		form.setValue("location.province", undefined);
		form.setValue("location.municipality", undefined);

		try {
			const data = await getProvincesInRegion(selectedRegion.name);
			setProvinces(data);
			setMunicipalities([]);
		} catch (error) {
			console.log("Errore nel caricamento delle province:", error);
		}
	};

	const handleProvinceChange = async (value: string) => {
		const selectedProvince = provinces.find((p: Province) => p.name === value);
		if (!selectedProvince) return;

		form.setValue("location.province", selectedProvince.name);
		form.setValue("location.municipality", undefined);

		try {
			const data = await getMunicipalitiesInProvince(selectedProvince.code);
			setMunicipalities(data);
		} catch (error) {
			console.log("Errore nel caricamento dei comuni:", error);
		}
	};

	const handleMunicipalityChange = (value: string) => {
		form.setValue("location.municipality", value);
	};

	return (
		<>
			<FormField
				control={form.control}
				name="location.country"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Country</FormLabel>
						<FormControl>
							<Input defaultValue="Italy" {...field} disabled />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="location.region"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Regione</FormLabel>
						<FormControl>
							<Select
								onValueChange={handleRegionChange}
								defaultValue={field.value}
								value={region}
							>
								<SelectTrigger>
									<SelectValue placeholder="Seleziona una regione" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{regions?.map((reg: Region) => (
											<SelectItem key={reg.name} value={reg.name}>
												{reg.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="location.province"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Provincia</FormLabel>
						<FormControl>
							<Select
								onValueChange={handleProvinceChange}
								defaultValue={field.value}
								disabled={!form.getValues("location.region")}
								value={province}
							>
								<SelectTrigger>
									<SelectValue placeholder="Seleziona una provincia" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{provinces?.map((prov: Province) => (
											<SelectItem key={prov.code} value={prov.name}>
												{prov.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="location.municipality"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Comune</FormLabel>
						<FormControl>
							<Select
								onValueChange={handleMunicipalityChange}
								defaultValue={field.value}
								disabled={!form.getValues("location.province")}
							>
								<SelectTrigger>
									<SelectValue placeholder="Seleziona un comune" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{municipalities?.map((mun: Municipality) => (
											<SelectItem key={mun.code} value={mun.name}>
												{mun.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
