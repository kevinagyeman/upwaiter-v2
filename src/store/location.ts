import type { Location } from "@prisma/client";
import { create } from "zustand";

interface LocationState {
	location: Location | null;
	setLocation: (location: Location) => void;
	clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set) => ({
	location: null,
	setLocation: (location) =>
		set({
			location,
		}),
	clearLocation: () =>
		set({
			location: null,
		}),
}));

export const isLocationValid = (location: Location | null): boolean => {
	if (!location) return false;

	const requiredFields: Array<keyof Location> = [
		"country",
		"canton",
		"municipality",
	];

	return requiredFields.every((field) => {
		const value = location[field];
		return typeof value === "string" && value.trim() !== "";
	});
};
