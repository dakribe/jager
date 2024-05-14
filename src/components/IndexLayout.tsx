import Sidebar from "./sidebar/Sidebar";

export default function IndexLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-start justify-between">
      <Sidebar />
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
