import { getLatestNotificationSchedule } from "@/lib/db/queries/getLatestNotificationSchedule";

import ScheduleForm from "./components/schedule-form";

export default async function Home() {
  const latestNotificationSchedule = await getLatestNotificationSchedule();

  return (
    <main>
      <ScheduleForm latestNotificationSchedule={latestNotificationSchedule} />
    </main>
  );
}
