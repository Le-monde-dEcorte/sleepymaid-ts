import { fail, redirect } from "@sveltejs/kit";
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/auth";

import type { Actions, RequestEvent, ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (event) => {
	if (event.locals.session === null || event.locals.user === null) {
		throw redirect(302, "/login");
	}
	return {
		user: event.locals.user,
	};
};

export const actions: Actions = {
	default: action,
};

async function action(event: RequestEvent) {
	if (event.locals.session === null) {
		return fail(401);
	}
	invalidateSession(event.locals.session.id);
	deleteSessionTokenCookie(event);
	return redirect(302, "/login");
}
