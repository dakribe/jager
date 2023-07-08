import { Card, CardContent, CardDescription, CardHeader } from './ui/card';

interface ApplicationStatCardProps {
  title: string;
  value: number | undefined;
}

export default function ApplicationStatCard({
  title,
  value,
}: ApplicationStatCardProps) {
  return (
    <Card className="w-52">
      <CardHeader>
        <CardDescription className="font-medium">{title}</CardDescription>
      </CardHeader>
      <CardContent className="text-2xl">{value}</CardContent>
    </Card>
  );
}
