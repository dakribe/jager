import Head from "next/head";
import Sidebar from "./sidebar/Sidebar";

export default function IndexLayout({
  children,
  title,
}: Readonly<{ children: React.ReactNode; title: string | undefined }>) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex items-start justify-between">
        <Sidebar />
        <div className="h-full w-full">{children}</div>
      </div>
    </>
  );
}
