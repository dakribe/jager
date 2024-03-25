import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex">
      <p>Jager</p>
      <div>
        <Button
          onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
          variant="ghost"
        >
          Log In
        </Button>
        <Button
          onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
          variant="secondary"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
