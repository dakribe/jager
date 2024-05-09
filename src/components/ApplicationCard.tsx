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
    <Link
      href={`/applications/${id}`}
      className="flex w-full justify-evenly border-b"
    >
      <p>{company}</p>
      <p>{jobTitle}</p>
      <p>{status}</p>
      <p>{location}</p>
    </Link>
  );
}
