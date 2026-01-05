import { getUser } from "@/auth/get-user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getUser();
    if (!user) {
      throw redirect({ to: "/" });
    }

    return user;
  },
  loader: async ({ context }) => {
    return context;
  },
});

function RouteComponent() {
  return <Outlet />;
}
