import { format } from "date-fns";
import { api } from "../utils/api";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import clsx from "clsx";

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
    <div
      className={clsx(
        "bg-[#1e1e1e] rounded-3xl flex items-center justify-between p-3",
        {
          "border border-green-600":
            status === "Accepted" || status === "Offer",
          "border border-yellow-600":
            status === "Interviewing" || status === "Applied",
          "border border-red-600":
            status === "Declined" || status === "Rejected",
        }
      )}
    >
      <div className="w-64 text-center">
        <p className="font-lg">{company}</p>
      </div>
      <div className="w-64 text-center">
        <p>{format(appliedDate, "P")}</p>
      </div>
      <div className="w-64 text-center">
        <p>{status}</p>
      </div>
      <div className="w-64 text-center flex justify-center space-x-4">
        <EditIcon
          h={5}
          w={5}
          _hover={{ cursor: "pointer", color: "gray.300" }}
        />
        <DeleteIcon
          onClick={() => {
            deleteApplication({ id });
          }}
          h={5}
          w={5}
          _hover={{ cursor: "pointer", color: "gray.300" }}
        ></DeleteIcon>
      </div>
    </div>
  );
}
