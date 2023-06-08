import { NextPage } from "next";
import Header from "~/components/Header";
import JobApplicationTable from "~/components/JobApplicationTable";
import Sidebar from "~/components/Sidebar";

const Applications: NextPage = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-14 mt-14">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Applications</h2>
            <p>List of all your job applications</p>
          </div>
          <JobApplicationTable />
        </main>
      </div>
    </div>
  );
};

export default Applications;
