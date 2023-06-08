import { NextPage } from "next";
import DashboardStats from "~/components/DashboardStats";
import Header from "~/components/Header";
import Sidebar from "~/components/Sidebar";

const Dashboard: NextPage = () => {
  return (
    <>
      <Header />
      <div className="dark flex">
        <Sidebar />
        <DashboardStats />
      </div>
    </>
  );
};

export default Dashboard;
