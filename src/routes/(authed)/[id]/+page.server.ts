import { getById } from "@/server/db/job_application";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	return {
		application: await getById(event.params.id),
	};
};
