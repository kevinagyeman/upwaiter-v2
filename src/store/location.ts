import { LocationFormSchema } from '@/schemas/location-schema';
import { Company, Waiter } from '@prisma/client';
import { CurrentUser } from '@stackframe/stack';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
  location: LocationFormSchema | null;
  setLocation: (location: LocationFormSchema) => void;
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

export const isLocationValid = (
  location: LocationFormSchema | null
): boolean => {
  if (!location) return false;

  return Object.values(location).every((value: any) => value.trim() !== '');
};
