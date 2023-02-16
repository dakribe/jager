import { format } from "date-fns";
import { api } from "../utils/api";
import { DeleteIcon } from "@chakra-ui/icons";
import { Text, Flex, Box, Center } from "@chakra-ui/react";

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
    <div className="bg-gray-700 rounded-lg flex items-center justify-between p-2">
      <div className="flex-1/4 w-64 text-center">
        <Text fontSize={"lg"}>{company}</Text>
      </div>
      <div className="w-64 text-center">
        <p>{format(appliedDate, "P")}</p>
      </div>
      <div className="w-64 text-center">
        <p>{status}</p>
      </div>
      <div className="w-64 text-center">
        <DeleteIcon
          onClick={() => {
            deleteApplication({ id });
          }}
          h={5}
          w={5}
          _hover={{ cursor: "pointer", color: "orange.400" }}
        ></DeleteIcon>
      </div>
    </div>
  );
}
