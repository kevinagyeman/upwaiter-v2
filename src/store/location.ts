import type { Location } from "@prisma/client";
import { create } from "zustand";

interface LocationState {
	location: any | null;
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

	return Object.values(location).every((value: any) => value.trim() !== "");
};
