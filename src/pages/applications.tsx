import { Box, Flex, Title } from '@mantine/core';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import IndexLayout from '~/components/IndexLayout';
import JobApplicationCard from '~/components/JobApplicationCard';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/utils/api';

const Applications: NextPage = () => {
    const { data } = useSession();

    const allApplications = api.jobApplication.getAll.useQuery({
        userId: data?.user.id as string,
    });

    return (
        <>
            <Head>
                <title>JAT | Applications</title>
            </Head>
            <IndexLayout>
                <Box mt="xl" ml="lg">
                    <Title>Applications</Title>
                    <Flex mt="2rem" gap="lg">
                        {allApplications.data?.map((application) => (
                            <JobApplicationCard
                                companyName={application.company_name}
                                jobTitle={application.job_title}
                                status={application.status}
                                notes={application.note}
                            />
                        ))}
                    </Flex>
                </Box>
            </IndexLayout>
        </>
    );
};

export default Applications;

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
