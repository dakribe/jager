import Link from "next/link";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/">
          <p className="text-2xl font-semibold">Jager</p>
        </Link>
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            onClick={() => signIn("", { callbackUrl: "/home" })}
          >
            Sign In
          </Button>
          <Button
            variant="secondary"
            onClick={() => signIn("", { callbackUrl: "/home" })}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
