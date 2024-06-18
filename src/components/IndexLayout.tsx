import Head from "next/head";
import Sidebar from "./sidebar/Sidebar";
import Header from "./Header";

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
        <div className="min-h-screen min-w-[300px] border-r">
          <Sidebar />
        </div>
        <main className="grid h-full w-full">
          <Header />
          <div>{children}</div>
        </main>
      </div>
    </>
  );
}
