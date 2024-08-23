import dayjs, { type Dayjs } from "dayjs";
import * as z from "zod";

import { NotificationInterval } from "../types";

export const notificationScheduleValidationSchema = z
  .object({
    emails: z
      .string()
      .min(1, "At least one email is required")
      .refine(
        (val) =>
          val
            .split(",")
            .every(
              (email) => z.string().email().safeParse(email.trim()).success
            ),
        "Invalid email address(es) found. Please check and try again."
      ),
    searchQuery: z.string().min(1, "Search query is required"),
    interval: z.nativeEnum(NotificationInterval),
    dayOfWeek: z.number().min(0).max(6).optional(),
    day: z.number().min(1).max(31).optional(),
    time: z
      .string()
      .min(1, "Time is required")
      .or(
        z
          .instanceof(dayjs as unknown as typeof Dayjs)
          .refine((val) => val.isValid(), {
            message: "Time is required",
          })
      ),
  })
  .refine(
    (data) => {
      if (
        data.interval === NotificationInterval.Weekly &&
        data.dayOfWeek === undefined
      ) {
        return false;
      }
      if (
        data.interval === NotificationInterval.Monthly &&
        data.day === undefined
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Day of week is required for weekly interval, Day of month is required for monthly interval",
      path: ["dayOfWeek", "day"],
    }
  );

export type NotificationScheduleValues = z.infer<
  typeof notificationScheduleValidationSchema
>;
