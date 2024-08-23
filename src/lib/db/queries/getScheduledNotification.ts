import dayjs from "dayjs";

import dbConnect from "@/lib/db/dbConnect";
import NotificationScheduleModel, {
  NotificationSchedule,
} from "@/lib/db/models/notification-schedule.schema";

import { NotificationInterval } from "../types";

export async function getScheduledNotification(): Promise<NotificationSchedule | null> {
  await dbConnect();

  const now = dayjs();
  const currentHour = now.hour();
  const currentMinute = now.minute();
  const currentDayOfWeek = now.day();
  const currentDayOfMonth = now.date();

  // Find the latest notification that matches the current time and frequency
  const notification =
    await NotificationScheduleModel.findOne<NotificationSchedule>({
      $or: [
        {
          interval: NotificationInterval.Daily,
          time: `${currentHour}:${currentMinute}`,
        },
        {
          interval: NotificationInterval.Weekly,
          dayOfWeek: currentDayOfWeek,
          time: `${currentHour}:${currentMinute}`,
        },
        {
          interval: NotificationInterval.Monthly,
          day: currentDayOfMonth,
          time: `${currentHour}:${currentMinute}`,
        },
      ],
    })
      .sort({ _id: -1 })
      .limit(1);

  return notification;
}
