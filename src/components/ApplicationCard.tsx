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
      <div className="background bg-background hover:bg-muted flex h-8 w-full items-center justify-between border-b px-4 text-left">
        <div className="bg-zinc-300">
          <p>{company}</p>
        </div>
        <p className="bg-red-300">{jobTitle}</p>
        <p className="bg-green-300">{status}</p>
        <p className="bg-purple-300">{location}</p>
        <p>{formattedDate}</p>
      </div>
    </Link>
  );
}
