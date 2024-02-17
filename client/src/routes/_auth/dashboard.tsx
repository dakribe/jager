import { useAuth } from "@/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const auth = useAuth();
  console.log(auth.isLoggedIn);
  return (
    <div>
      {auth.isLoggedIn}
      <p>Dashboard</p>
    </div>
  );
}
