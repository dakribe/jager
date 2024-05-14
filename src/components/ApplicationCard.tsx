import Link from "next/link";

interface ApplicationCardProps {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  status: string;
}

export default function ApplicationCard({
  id,
  company,
  jobTitle,
  status,
  location,
}: ApplicationCardProps) {
  return (
    <Link href={`/applications/${id}`}>
      <div className="background bg-background flex h-8 w-full items-center justify-evenly border-b hover:bg-slate-900/80">
        <p>{company}</p>
        <p>{jobTitle}</p>
        <p>{status}</p>
        <p>{location}</p>
      </div>
    </Link>
  );
}
