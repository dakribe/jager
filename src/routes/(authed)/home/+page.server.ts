import { invalidateSession, deleteSessionTokenCookie } from "@/server/auth";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { createApplicationSchema } from "../schema";
import {
	CreateJobApplication,
	getJobApplications,
} from "@/server/db/job_application";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user === null) {
		return fail(401);
	}

	const applications = await getJobApplications(event.locals.user.id);

	return {
		applications,
	};
};

export const actions: Actions = {
	logout: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, "/login");
	},
	createApplication: async (event) => {
		if (event.locals.user === null) {
			return fail(401);
		}

		const form = await superValidate(event, zod(createApplicationSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const data = await CreateJobApplication({
			userId: event.locals.user?.id,
			title: form.data.title,
			company: form.data.company,
			status: form.data.status,
			appliedDate: form.data.appliedDate,
		});

		return {
			form,
			data,
		};
	},
};
