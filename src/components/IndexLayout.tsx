import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toaster } from "./ui/toaster";

interface IndexLayoutProps {
  children?: React.ReactNode;
  heading: string;
  subHeading: string;
}

export default function IndexLayout({
  children,
  heading,
  subHeading,
}: IndexLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <div className="pl-8 mt-12">
          <div className="">
            <h1 className="font-bold">{heading}</h1>
            <p>{subHeading}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
