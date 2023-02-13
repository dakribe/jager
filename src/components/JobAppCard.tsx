import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';
import { api } from '../utils/api';

interface JobAppCardProps {
  company: string;
  appliedDate: Date;
  id: string;
  status: string;
}

export default function JobAppCard({
  company,
  appliedDate,
  id,
  status,
}: JobAppCardProps) {
  const utils = api.useContext();
  const { mutate: deleteApplication } =
    api.jobApplication.deleteApplication.useMutation({
      onSuccess() {
        utils.jobApplication.getAll.invalidate();
      },
    });

  return (
    <Box bg={'blackAlpha.300'} w={500} rounded={'xl'}>
      <Heading size={'md'}>{company}</Heading>
      <p>{format(appliedDate, 'P')}</p>
      <p>{status}</p>
      <DeleteIcon
        onClick={() => {
          deleteApplication({ id });
        }}
      />
    </Box>
  );
}
