import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  heading: string;
}

export default function Layout({ children, heading }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full">
        <Sidebar />
        <div className="mt-12 pl-10">
          <div className="mb-6">
            <h1 className="scroll-m-20 text-3xl font-semibold transition-colors">
              {heading}
            </h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
