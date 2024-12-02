import { fail, redirect, type Actions, type RequestEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { invalidateSession, deleteSessionTokenCookie } from "@/server/auth";

export const load: PageServerLoad = (event: RequestEvent) => {
	if (event.locals.session === null && event.locals.user === null) {
		return redirect(302, "/login");
	}

	return redirect(302, "/home");
};

export const actions: Actions = {
	default: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, "/login");
	},
};
