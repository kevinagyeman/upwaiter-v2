import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

interface LocationFormProps {
	form: UseFormReturn<any>;
	isRequired?: boolean;
	region?: string;
	province?: string;
	municipality?: string;
}

export default function LocationForm({
	form,
	region,
	province,
}: LocationFormProps) {
	const t = useTranslations("location");
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

	// Load provinces when region prop is provided
	useEffect(() => {
		const loadProvinces = async () => {
			if (region) {
				try {
					const data = await getProvincesInRegion(region);
					setProvinces(data);
				} catch (error) {
					console.log("Error loading provinces:", error);
				}
			}
		};
		loadProvinces();
	}, [region]);

	// Load municipalities when province prop is provided
	useEffect(() => {
		const loadMunicipalities = async () => {
			if (province && provinces.length > 0) {
				const selectedProvince = provinces.find((p) => p.name === province);
				if (selectedProvince) {
					try {
						const data = await getMunicipalitiesInProvince(
							selectedProvince.code,
						);
						setMunicipalities(data);
					} catch (error) {
						console.log("Error loading municipalities:", error);
					}
				}
			}
		};
		loadMunicipalities();
	}, [province, provinces]);

	const handleRegionChange = async (value: string) => {
		const selectedRegion = regions.find((r) => r.name === value);
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
		const selectedProvince = provinces.find((p) => p.name === value);
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
						<FormLabel>{t("country")}</FormLabel>
						<FormControl>
							<Input defaultValue="IT" {...field} disabled />
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
						<FormLabel>{t("region")}</FormLabel>
						<FormControl>
							<Select
								onValueChange={handleRegionChange}
								defaultValue={field.value}
								value={region}
								required
							>
								<SelectTrigger>
									<SelectValue placeholder={t("selectRegion")} />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{regions?.map((reg) => (
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
						<FormLabel>{t("province")}</FormLabel>
						<FormControl>
							<Select
								onValueChange={handleProvinceChange}
								defaultValue={field.value}
								disabled={!form.getValues("location.region")}
								value={province}
								required
							>
								<SelectTrigger>
									<SelectValue placeholder={t("selectProvince")} />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{provinces?.map((prov) => (
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
						<FormLabel>{t("municipality")}</FormLabel>
						<FormControl>
							<Select
								onValueChange={handleMunicipalityChange}
								defaultValue={field.value}
								disabled={!form.getValues("location.province")}
								required
							>
								<SelectTrigger>
									<SelectValue placeholder={t("selectMunicipality")} />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{municipalities?.map((mun) => (
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
