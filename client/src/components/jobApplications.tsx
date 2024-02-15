import { graphql } from "@/__generated__";
import { useQuery } from "urql";

const GetApplicationsQuery = graphql(`
  query getApplications {
    getApplications {
      id
      title
      company
    }
  }
`);

export function JobApplications() {
  const [{ data }] = useQuery({
    query: GetApplicationsQuery,
  });

  return (
    <div>
      <ul>
        {data?.getApplications?.map((application) => (
          <div key={application.id}>
            <p>{application.title}</p>
            <p>{application.company}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
