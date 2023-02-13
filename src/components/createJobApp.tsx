import { Select, FormLabel, Input } from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useState } from 'react';
import { api } from '../utils/api';

export default function createJobApp() {
  const utils = api.useContext();
  const { mutateAsync } = api.jobApplication.create.useMutation({
    onSuccess() {
      utils.jobApplication.getAll.invalidate();
    },
  });

  const [company, setCompany] = useState('');
  const [appliedDate, setAppliedDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (company.length < 2 || status.length === 0) {
      return false;
    }

    mutateAsync({ company, appliedDate, status });
    setCompany('');
    setStatus('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-row gap-4 items-end">
        <div>
          <FormLabel>Company</FormLabel>
          <Input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <FormLabel>Date applied</FormLabel>
          <SingleDatepicker
            name="date-input"
            date={appliedDate}
            onDateChange={setAppliedDate}
            configs={{ dateFormat: 'MM-dd-yyyy' }}
            propsConfigs={{
              dayOfMonthBtnProps: {
                defaultBtnProps: {
                  _hover: {
                    backgroundColor: 'orange.800',
                  },
                },
                selectedBtnProps: {
                  background: 'orange.500',
                },
              },
            }}
          />
        </div>
        <div>
          <FormLabel>Application status</FormLabel>
          <Select
            value={status}
            placeholder="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Declined">Declined</option>
            <option value="Rejected">Rejected</option>
          </Select>
        </div>
        <button
          type="submit"
          className="bg-orange-500 w-28 p-2 font-bold rounded-lg"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
