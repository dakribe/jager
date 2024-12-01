import { type RequestEvent, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { superValidate } from "sveltekit-superforms";
import { createApplicationSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async (event: RequestEvent) => {
	if (event.locals.session === null && event.locals.user === null) {
		return redirect(302, "/login");
	}

	return {
		user: event.locals.user,
		form: await superValidate(zod(createApplicationSchema)),
	};
};
