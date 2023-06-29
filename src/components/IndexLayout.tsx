import User from "./User";
import Sidebar from "./Sidebar";

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
    <div className="flex">
      <Sidebar />
      <div className="pl-8">
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold">{heading}</h2>
          <p className="text-muted-foreground">{subHeading}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
