import { Slash, Trash } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import Header from "~/components/Header";
import IndexLayout from "~/components/IndexLayout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

interface ApplicationProps {
  id: string;
}

export default function Application({ id }: ApplicationProps) {
  const { data: application } = api.jobApplication.getApplicationById.useQuery({
    id: id[0]!,
  });

  return (
    <IndexLayout>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/applications">Applications</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{application?.company}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button variant="outline">
          <Trash />
        </Button>
      </Header>
      <div>{application?.jobTitle}</div>
    </IndexLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const { id } = ctx.query;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      id,
    },
  };
};
