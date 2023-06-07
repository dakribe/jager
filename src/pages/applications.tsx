import { NextPage } from "next";
import CreateJobApplicationForm from "~/components/CreateApplicationForm";
import Header from "~/components/Header";
import Sidebar from "~/components/Sidebar";

const Applications: NextPage = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <CreateJobApplicationForm />
      </div>
    </div>
  );
};

export default Applications;
