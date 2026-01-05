import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useLoaderData({ from: "/_authed" });

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <Button onClick={() => authClient.signOut}>Sign Out</Button>
    </div>
  );
}
