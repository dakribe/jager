import { createFileRoute } from "@tanstack/react-router";
import { gql, useQuery } from "urql";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const meQuery = gql`
  query me {
    me {
      username
      id
    }
  }
`;

function Dashboard() {
  const [result] = useQuery({
    query: meQuery,
  });
  console.log(result?.data?.me);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, {result?.data?.me?.username}</p>
    </div>
  );
}
