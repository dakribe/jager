import Head from "next/head";
import { Toaster } from "./ui/toaster";

interface IndexLayoutProps {
  children?: React.ReactNode;
  title: string;
}

export default function IndexLayout({ children, title }: IndexLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>{children}</main>
      <Toaster />
    </>
  );
}
