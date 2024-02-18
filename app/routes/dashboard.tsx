import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (!user) return redirect("/login");

  return json({ user });
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      {/* Content */}
      <div className="mx-auto flex h-full w-full max-w-[280px] flex-col items-center justify-center gap-6">
        {/* Account Info */}
        <div className="flex flex-col items-center gap-2">
          <span className="h-24 w-24 text-8xl transition duration-200 hover:-translate-y-1">
            🥳
          </span>

          <div className="flex flex-col items-center gap-1">
            <h1 className="text-center text-2xl font-semibold tracking-tight">
              My account
            </h1>
            <p className="flex items-center whitespace-nowrap text-center text-base font-semibold text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
