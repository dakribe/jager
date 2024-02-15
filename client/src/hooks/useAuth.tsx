import { redirect } from "@tanstack/react-router";
import { gql, useQuery } from "urql";

const meQuery = gql`
  query me {
    me {
      username
      id
    }
  }
`;

export function useAuth() {
  const [result] = useQuery({
    query: meQuery,
  });
  console.log(result);

  if (result.error) {
    throw redirect({
      to: "/signin",
    });
  }
}
