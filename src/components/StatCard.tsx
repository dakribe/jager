interface StatCardProps {
  title: string;
  count: number | undefined;
}

export default function StatCard({ title, count }: StatCardProps) {
  return (
    <div>
      <p>{title}</p>
      <p>{count}</p>
    </div>
  );
}
