import Head from "next/head";
import Hero from "~/components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jager</title>
      </Head>
      <div className="flex h-screen items-center justify-center">
        <Hero />
      </div>
    </>
  );
}
