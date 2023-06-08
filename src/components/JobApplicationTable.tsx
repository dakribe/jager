import { api } from "~/utils/api";
import { columns } from "./table/columns";
import { DataTable } from "./table/DataTable";
import { useSession } from "next-auth/react";

export default function JobApplicationTable() {
  const { data: sessionData } = useSession();
  const data = api.application.getAll.useQuery({
    userId: sessionData?.user.id as string,
  });

  return (
    <div className=" w-[800px] py-10">
      <DataTable columns={columns} data={data?.data} />
    </div>
  );
}
