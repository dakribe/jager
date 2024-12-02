import { deleteJobApplication, getById } from "@/server/db/job_application";
import type { PageServerLoad } from "./$types";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	return {
		application: await getById(event.params.id),
	};
};

export const actions: Actions = {
	delete: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}

		await deleteJobApplication(event.params.id!);
		redirect(302, "/home");
	},
};
