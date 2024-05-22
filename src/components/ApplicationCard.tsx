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
      <div className="background bg-background flex h-8 w-full items-center justify-between border-b px-4 hover:bg-slate-900/80">
        <p>{company}</p>
        <p>{jobTitle}</p>
        <p>{status}</p>
        <p>{location}</p>
        <p>{formattedDate}</p>
      </div>
    </Link>
  );
}
