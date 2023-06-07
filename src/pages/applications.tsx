import { NextPage } from "next";
import CreateJobApplicationForm from "~/components/CreateApplicationForm";

const Applications: NextPage = () => {
  return (
    <div>
      <CreateJobApplicationForm />
    </div>
  );
};

export default Applications;
