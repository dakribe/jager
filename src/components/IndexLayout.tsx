import Header from "./Header";
import Sidebar from "./Sidebar";

export default function IndexLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-start justify-between">
      <Sidebar />
      <div className="h-full w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
