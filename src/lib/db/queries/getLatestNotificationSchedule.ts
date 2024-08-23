import dbConnect from "@/lib/db/dbConnect";
import NotificationScheduleModel, {
  NotificationSchedule,
} from "@/lib/db/models/notification-schedule.schema";

import { FormDefaultValues } from "../types";

export async function getLatestNotificationSchedule(): Promise<FormDefaultValues> {
  await dbConnect();

  const latestNotification = await NotificationScheduleModel.findOne()
    .sort({ _id: -1 })
    .select("-emails")
    .lean<NotificationSchedule>();

  return latestNotification;
}
