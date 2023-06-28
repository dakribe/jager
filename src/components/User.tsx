import { signOut, useSession } from "next-auth/react";

export default function User() {
  const { data: sessionData } = useSession();

  return (
    <div>
    </div>
  );
}
