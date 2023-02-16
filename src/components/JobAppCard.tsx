import { format } from "date-fns";
import { api } from "../utils/api";
import { DeleteIcon } from "@chakra-ui/icons";

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
    <div className="bg-gray-700 rounded-lg flex items-center justify-around p-2 align-middle">
      <p className="text-lg">{company}</p>
      <p>{format(appliedDate, "P")}</p>
      <p>{status}</p>
      <DeleteIcon
        onClick={() => {
          deleteApplication({ id });
        }}
      ></DeleteIcon>
    </div>
  );
}
