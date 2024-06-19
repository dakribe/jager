import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import dynamic from "next/dynamic";
const ResponsiveCalendar = dynamic(
  () => import("@nivo/calendar").then((m) => m.ResponsiveCalendar),
  { ssr: false },
);

export default function ApplicationCalendarChart() {
  const currentYear = new Date().getFullYear();
  const firstDayOfYear = new Date(currentYear, 0, 1).toString();
  const lastDayOfYear = new Date(currentYear, 11, 31).toString();

  const { data: sessionData } = useSession();

  const { data: calendarData } = api.jobApplication.getCalendarData.useQuery({
    id: sessionData?.user.id as string,
  });

  if (!calendarData) {
    return <p>Error</p>;
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Application History</CardTitle>
        <CardDescription>
          Your application history over the past year.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveCalendar
          data={calendarData}
          from={firstDayOfYear}
          to={lastDayOfYear}
          emptyColor="#9CA3AF"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#030712"
          dayBorderWidth={2}
          dayBorderColor="#030712"
          legends={[
            {
              itemTextColor: "#ffffff",
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
