import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import AddApplicationModal from '~/components/AddApplicationModal';
import IndexLayout from '~/components/IndexLayout';
import { getServerAuthSession } from '~/server/auth';

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>JAT | Home</title>
            </Head>
            <IndexLayout>
                <div>Dashboard</div>
                <AddApplicationModal />
            </IndexLayout>
        </>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
};
