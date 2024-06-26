import Link from "next/link";
import moment from "moment";

interface ApplicationCardProps {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  status: string;
  dateApplied: Date;
}

export default function ApplicationCard({
  id,
  company,
  jobTitle,
  status,
  location,
  dateApplied,
}: ApplicationCardProps) {
  const formattedDate = moment(dateApplied).startOf("hour").fromNow();
  return (
    <Link href={`/applications/${id}`}>
      <div className="background bg-background hover:bg-muted flex h-10 w-full items-center justify-between border-b px-4">
        <div className="w-64">
          <p>{company}</p>
        </div>
        <div className="w-64">
          <p>{jobTitle}</p>
        </div>
        <div className="w-64">
          <p>{status}</p>
        </div>
        <div className="w-64">
          <p>{location}</p>
        </div>
        <div className="w-64">
          <p>{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}
