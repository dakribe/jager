import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div>
      <Button
        onClick={() =>
          authClient.signIn.social({
            provider: "google",
            callbackURL: "/home",
          })
        }
      >
        Sign In
      </Button>
    </div>
  );
}

