import { Box, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';

interface JobAppCardProps {
  company: string;
  appliedDate: Date;
}

export default function JobAppCard({ company, appliedDate }: JobAppCardProps) {
  return (
    <Box bg={'blackAlpha.300'} w={500} rounded={'2xl'}>
      <Heading size={'md'}>{company}</Heading>
      <p>{format(appliedDate, 'P')}</p>
    </Box>
  );
}
