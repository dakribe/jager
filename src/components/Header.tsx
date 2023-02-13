import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <div className="flex justify-between">
      <p className="font-bold text-4xl">JAT</p>
      {sessionData ? (
        <button
          className="bg-orange-500 p-2 w-22 rounded-lg font-bold hover:bg-orange-600"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
