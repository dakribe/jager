import { signIn } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jager</title>
        <meta name="description" content="Job application tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Home</h1>
        <button onClick={() => void signIn("", { callbackUrl: "/dashboard" })}>
          Sign In
        </button>
      </main>
    </>
  );
}
