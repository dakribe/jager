import { api } from "~/utils/api";

export function AllApplications() {
  const { data } = api.jobApplication.getAll.useQuery();
  return (
    <div>
      <p>Applications</p>
      <ul>{data?.map((application) => <li>{application.title}</li>)}</ul>
    </div>
  );
}
