import { Badge, Card, Group, Text } from '@mantine/core';

interface JobApplicationCardProps {
    companyName: string;
    jobTitle: string;
    status: string;
    notes: string | null;
}

export default function JobApplicationCard({
    companyName,
    jobTitle,
    notes,
    status,
}: JobApplicationCardProps) {
    return (
        <Card w={'18rem'} h={'10rem'} withBorder shadow="md" padding="sm">
            <Group position="apart">
                <Text size="lg">{companyName}</Text>
                <Badge>{status}</Badge>
            </Group>
            <Text color="dimmed">{jobTitle}</Text>
            <Text color="dimmed">{notes}</Text>
        </Card>
    );
}
