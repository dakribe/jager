import { decodeIdToken, type OAuth2Tokens } from "arctic";
import type { RequestEvent } from "../$types";
import { google } from "@/server/oauth";
import { ObjectParser } from "@pilcrowjs/object-parser";
import { createUser, getUserFromGoogleId } from "@/server/db/user";
import {
	createSession,
	generateSessionToken,
	setSessionTokenCookie,
} from "@/server/auth";

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
	const storedState = event.cookies.get("google_oauth_state") ?? null;
	const codeVerifier = event.cookies.get("google_code_verifier") ?? null;
	if (
		code === null ||
		state === null ||
		storedState == null ||
		codeVerifier === null
	) {
		return new Response(null, {
			status: 400,
		});
	}

	if (state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		return new Response(null, {
			status: 400,
		});
	}

	const claims = decodeIdToken(tokens.idToken());
	const claimsParser = new ObjectParser(claims);

	const googleId = claimsParser.getString("sub");
	const name = claimsParser.getString("name");
	const image = claimsParser.getString("picture");
	const email = claimsParser.getString("email");

	const existingUser = await getUserFromGoogleId(googleId);
	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/home",
			},
		});
	}

	const user = await createUser({ name, email, googleId, image });
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/home",
		},
	});
}
