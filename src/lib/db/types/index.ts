import { NotificationSchedule } from "../models/notification-schedule.schema";

export enum NotificationInterval {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

export type FormDefaultValues = Omit<NotificationSchedule, "emails"> | null;
