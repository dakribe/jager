import { useAuth } from "@/auth";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    console.log("Hit layout");
    if (!context.auth.isLoggedIn) {
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const auth = useAuth();

  return (
    <div>
      <p>{auth.isLoggedIn}</p>
      <Outlet />
    </div>
  );
}
