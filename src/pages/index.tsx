import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jager</title>
        <meta name="description" content="Job application tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-5xl">
        <h1>Track your job search</h1>
      </main>
    </>
  );
}
