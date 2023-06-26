import { signIn } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>JAT</title>
                <meta name="description" content="Job application tracker" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Home</h1>
                <button
                    onClick={() =>
                        void signIn('', { callbackUrl: '/dashboard' })
                    }
                >
                    Sign In
                </button>
            </main>
        </>
    );
}
