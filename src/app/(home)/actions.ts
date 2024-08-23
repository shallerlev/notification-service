"use server";

import { revalidatePath } from "next/cache";

import dbConnect from "@/lib/db/dbConnect";
import NotificationScheduleModel from "@/lib/db/models/notification-schedule.schema";
import {
  notificationScheduleValidationSchema,
  NotificationScheduleValues,
} from "@/lib/db/validation/notification-schedule.validation";

export async function saveSchedule(data: NotificationScheduleValues) {
  const validatedData =
    await notificationScheduleValidationSchema.parseAsync(data);

  const emails = validatedData.emails.split(",").map((email) => email.trim());

  await dbConnect();

  const existingSchedule = await NotificationScheduleModel.findOne();

  if (existingSchedule) {
    // If a schedule exists, update it
    await NotificationScheduleModel.updateOne(
      { _id: existingSchedule._id },
      {
        ...validatedData,
        emails,
      }
    );
  } else {
    // If no schedule exists, create a new one
    await NotificationScheduleModel.create({
      ...validatedData,
      emails,
    });
  }

  revalidatePath("/");
}
