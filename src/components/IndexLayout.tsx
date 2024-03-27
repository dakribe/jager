import Head from "next/head";
import { Toaster } from "./ui/sonner";
import Sidebar from "./sidebar/sidebar";

interface IndexLayoutProps {
  children?: React.ReactNode;
  title: string;
  heading: string;
}

export default function IndexLayout({
  children,
  title,
  heading,
}: IndexLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex h-screen flex-col">
        <div className="flex h-full">
          <Sidebar />
          <div className="mt-12 w-full pl-8">
            <h1 className="text-xl font-medium">{heading}</h1>
            {children}
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
