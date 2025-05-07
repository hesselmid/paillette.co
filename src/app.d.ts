// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { UserRole } from '$lib/server/db/schema';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number;
				email: string;
				firstName: string;
				lastName: string;
				role: UserRole;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
