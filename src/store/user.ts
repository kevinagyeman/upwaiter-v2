import type { Company, Waiter } from "@prisma/client";
import type { CurrentUser } from "@stackframe/stack";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
	user: CurrentUser | null;
	isAuthenticated: boolean;
	role: "company" | "waiter" | null;
	company: Company | null;
	waiter: Waiter | null;
	setUser: (
		user: CurrentUser,
		role: "company" | "waiter",
		data: Company | Waiter,
	) => void;
	clearUser: () => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			role: null,
			company: null,
			waiter: null,
			setUser: (user, role, data) =>
				set({
					user,
					isAuthenticated: true,
					role,
					company: role === "company" ? (data as Company) : null,
					waiter: role === "waiter" ? (data as Waiter) : null,
				}),
			clearUser: () =>
				set({
					user: null,
					isAuthenticated: false,
					role: null,
					company: null,
					waiter: null,
				}),
		}),
		{
			name: "user-storage",
		},
	),
);
