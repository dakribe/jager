import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/utils/auth-session.server";
import { authenticator } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });

  const cookie = await getSession(request.headers.get("cookie"));
  const authEmail = cookie.get("auth:email");
  const authError = cookie.get(authenticator.sessionErrorKey);

  return json({ authEmail, authError } as const, {
    headers: {
      "set-cookie": await commitSession(cookie),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const currentPath = url.pathname;

  await authenticator.authenticate("TOTP", request, {
    successRedirect: "/verify",
    failureRedirect: currentPath,
  });
}

export default function Login() {
  const { authEmail, authError } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex h-full w-full max-w-[350px] flex-col items-center justity-center gap-6">
      <Form
        method="post"
        autoComplete="off"
        className="flex w-full flex-col gap-2"
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={authEmail ? authEmail : ""}
            placeholder="name@example.com"
            className="h-10 rounded-md border-2 border-gray-200 bg-transparent px-4 text-base font-semibold placeholder:font-normal placeholder:text-gray-400"
            required
          />
        </div>
        <button type="submit">Continue with Email</button>
      </Form>

      {!authEmail && authError && <span>{authError.message}</span>}
    </div>
  );
}
