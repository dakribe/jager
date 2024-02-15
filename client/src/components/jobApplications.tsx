import { gql, useQuery } from "urql";

const GetApplicationsQuery = gql`
  query getApplications {
    getApplications {
      id
      title
      company
    }
  }
`;

export function JobApplications() {
  const [result] = useQuery({
    query: GetApplicationsQuery,
  });

  if (result.error) <p>Error fetching applications</p>;

  return (
    <div>
      <ul>
        {result.data?.getApplications?.map((application) => (
          <div key={application.id}>
            <p>{application.title}</p>
            <p>{application.company}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
