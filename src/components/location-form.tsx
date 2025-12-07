import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
	getCantons,
	getDistrictsInCanton,
	getMunicipalitiesInDistrict,
} from "@/services/swiss-service";
import type { Canton } from "@/types/swiss-location-type";

type LocationFormProps = {
	form: UseFormReturn<any>; // Usa il tipo corretto se possibile
	isRequired?: boolean;
	canton?: string;
	district?: string;
	municipality?: string;
};

export default function LocationForm({
	form,
	isRequired = false,
	canton,
	municipality,
	district,
}: LocationFormProps) {
	const [cantons, setCantons] = useState<Canton[]>([]);
	const [districts, setDistricts] = useState<any>([]);
	const [municipalities, setMunicipalities] = useState<any>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getCantons();
			if (data) {
				setCantons(data);
			}
		};
		fetchData();
	}, []);

	const handleCantonChange = async (value: string) => {
		const canton = cantons.find((canton: Canton) => canton.name === value);
		if (!canton) return;

		form.setValue("location.canton", canton.name);
		form.setValue("location.district", undefined);
		form.setValue("location.municipality", undefined);

		try {
			const data = await getDistrictsInCanton(canton.key);
			setDistricts(data);
			setMunicipalities([]);
		} catch (error) {
			console.log("Errore nel caricamento dei distretti:", error);
		}
	};

	const handleDistrictChange = async (value: string) => {
		const district = districts.find((d: any) => d.name === value);
		if (!district) return;

		form.setValue("location.district", value);
		form.setValue("location.municipality", undefined);

		try {
			const data = await getMunicipalitiesInDistrict(district.key);
			setMunicipalities(data);
		} catch (error) {
			console.log("Errore nel caricamento dei comuni:", error);
		}
	};

	const handleMunicipalityChange = (value: string) => {
		form.setValue("location.municipality", value);
	};

	return (
		<>dd</>
		// <Form {...form}>
		//   <FormField
		//     control={form.control}
		//     name='location.country'
		//     render={({ field }) => (
		//       <FormItem>
		//         <FormLabel>Country</FormLabel>
		//         <FormControl>
		//           <Input placeholder={field.name} {...field} disabled />
		//         </FormControl>
		//         <FormMessage />
		//       </FormItem>
		//     )}
		//   />
		//   <FormField
		//     control={form.control}
		//     name='location.canton'
		//     render={({ field }) => (
		//       <FormItem>
		//         <FormLabel>Cantone</FormLabel>
		//         <FormControl>
		//           <Select
		//             onValueChange={handleCantonChange}
		//             defaultValue={field.value}
		//             required={isRequired}
		//             value={canton}
		//           >
		//             <SelectTrigger>
		//               <SelectValue placeholder='Seleziona un cantone' />
		//             </SelectTrigger>
		//             <SelectContent>
		//               <SelectGroup>
		//                 {cantons?.map((canton: Canton, index: number) => (
		//                   <SelectItem key={index} value={canton.name}>
		//                     {canton.name}
		//                   </SelectItem>
		//                 ))}
		//               </SelectGroup>
		//             </SelectContent>
		//           </Select>
		//         </FormControl>
		//         <FormMessage />
		//       </FormItem>
		//     )}
		//   />
		//   <FormField
		//     control={form.control}
		//     name='location.district'
		//     render={({ field }) => (
		//       <FormItem>
		//         <FormLabel>Distretto</FormLabel>
		//         <FormControl>
		//           <Select
		//             onValueChange={handleDistrictChange}
		//             defaultValue={field.value}
		//             disabled={!form.getValues('location.canton')}
		//             required={isRequired}
		//             value={district}
		//           >
		//             <SelectTrigger>
		//               <SelectValue placeholder='Seleziona un distretto' />
		//             </SelectTrigger>
		//             <SelectContent>
		//               <SelectGroup>
		//                 {districts?.map((district: any, index: number) => (
		//                   <SelectItem key={index} value={district.name}>
		//                     {district.name}
		//                   </SelectItem>
		//                 ))}
		//               </SelectGroup>
		//             </SelectContent>
		//           </Select>
		//         </FormControl>
		//         <FormMessage />
		//       </FormItem>
		//     )}
		//   />

		//   <FormField
		//     control={form.control}
		//     name='location.municipality'
		//     render={({ field }) => (
		//       <FormItem>
		//         <FormLabel>Comune</FormLabel>
		//         <FormControl>
		//           <Select
		//             onValueChange={handleMunicipalityChange}
		//             defaultValue={field.value}
		//             disabled={!form.getValues('location.district')}
		//             required={isRequired}
		//           >
		//             <SelectTrigger>
		//               <SelectValue placeholder='Seleziona un comune' />
		//             </SelectTrigger>
		//             <SelectContent>
		//               <SelectGroup>
		//                 {municipalities?.map((municipality: any, index: number) => (
		//                   <SelectItem key={index} value={municipality.name}>
		//                     {municipality.name}
		//                   </SelectItem>
		//                 ))}
		//               </SelectGroup>
		//             </SelectContent>
		//           </Select>
		//         </FormControl>
		//         <FormMessage />
		//       </FormItem>
		//     )}
		//   />
		// </Form>
	);
}
