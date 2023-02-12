import { Button } from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useState } from 'react';
import { api } from '../utils/api';

export default function createJobApp() {
  const { mutateAsync } = api.jobApplication.create.useMutation();

  const [company, setCompany] = useState('');
  const [appliedDate, setAppliedDate] = useState(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (company.length < 2) {
      return false;
    }

    mutateAsync({ company, appliedDate });
    setCompany('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <SingleDatepicker
          name="date-input"
          date={appliedDate}
          onDateChange={setAppliedDate}
        />
        <Button type="submit" bg={'orange.500'}>
          Create Job
        </Button>
      </form>
    </div>
  );
}
