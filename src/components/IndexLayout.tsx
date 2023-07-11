import Sidebar from "./Sidebar";
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
      <div className="flex h-full">
        <Sidebar />
        <div className="pl-8 mt-12">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold transition-colors scroll-m-20">
              {heading}
            </h1>
            <p className="text-muted-foreground">{subHeading}</p>
          </div>
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
}
