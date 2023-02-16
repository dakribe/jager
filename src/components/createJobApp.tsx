import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";
import { api } from "../utils/api";

export default function createJobApp() {
  const utils = api.useContext();
  const { mutateAsync } = api.jobApplication.create.useMutation({
    onSuccess() {
      utils.jobApplication.getAll.invalidate();
    },
  });

  const [company, setCompany] = useState("");
  const [appliedDate, setAppliedDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (company.length < 2 || status.length === 0) {
      return false;
    }

    mutateAsync({ company, appliedDate, status });
    setCompany("");
    setStatus("");
  };

  return (
    <Box>
      <FormControl>
        <form onSubmit={handleSubmit}>
          <HStack align={"end"}>
            <Box>
              <FormLabel>Company</FormLabel>
              <Input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                width="300px"
              />
            </Box>
            <Box>
              <FormLabel>Date applied</FormLabel>
              <SingleDatepicker
                name="appplication-date-input"
                date={appliedDate}
                onDateChange={setAppliedDate}
                configs={{ dateFormat: "MM-dd-yyyy" }}
                propsConfigs={{
                  dayOfMonthBtnProps: {
                    defaultBtnProps: {
                      _hover: {
                        backgroundColor: "orange.800",
                      },
                    },
                    selectedBtnProps: {
                      background: "orange.500",
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <FormLabel>Application status</FormLabel>
              <Select
                value={status}
                placeholder="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Accepted">Accepted</option>
                <option value="Applied">Applied</option>
                <option value="Declined">Declined</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offered</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </Box>
            <Button
              bg={"orange.500"}
              _hover={{ backgroundColor: "orange.600" }}
              type="submit"
            >
              Create Job
            </Button>
          </HStack>
        </form>
      </FormControl>
    </Box>
  );
}
