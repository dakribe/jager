import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="mt-10 flex items-center justify-between">
      <Link href="/">
        <p className="text-2xl font-semibold">Jager</p>
      </Link>
      <ul className="flex gap-4">
        <Link href="#">
          <li>Features</li>
        </Link>
        <Link href="#">
          <li>Pricing</li>
        </Link>
        <Link href="#">
          <li>Contact</li>
        </Link>
      </ul>
      <div className="flex gap-4">
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
          Sign Up
        </Button>
      </div>
    </div>
  );
}
