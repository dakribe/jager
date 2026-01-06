import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Jager</h1>
          <p className="text-muted-foreground">Job Application Tracker</p>
        </div>

        <Button
          className="w-full"
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: "/home",
            })
          }
        >
          Sign in with Google
        </Button>
      </Card>
    </div>
  );
}
