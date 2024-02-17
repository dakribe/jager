import { AuthContext } from "@/auth";
import {
  Link,
  Outlet,
  createRootRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{ auth: AuthContext }>()({
  beforeLoad: async ({ context }) => {
    return context;
  },
  component: Root,
});

function Root() {
  return (
    <>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
      <Outlet />
    </>
  );
}
