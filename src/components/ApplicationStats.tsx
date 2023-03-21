import { useSession } from "next-auth/react";
import { Disclosure } from "@headlessui/react";
import { api } from "../utils/api";

export default function ApplicationStats() {
  const { data } = useSession();
  const jobAppData = api.jobApplication.getAll.useQuery({
    userId: data?.user.id as string,
  });
  const totalApps = jobAppData.data?.length;

  console.log(jobAppData.data);

  return (
    <Disclosure>
      <Disclosure.Button className="py-2">
        <p>View stats</p>
      </Disclosure.Button>
      <Disclosure.Panel className="text-gray-500">
        <div className="flex flex-col items-center text-xl">
          <p className="">Total</p>
          <p className="text-orange-500">{totalApps}</p>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
