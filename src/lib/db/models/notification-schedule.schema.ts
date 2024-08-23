import mongoose from "mongoose";

import { NotificationInterval } from "../types";

export interface NotificationSchedule {
  _id: string;
  emails: string[];
  searchQuery: string;
  interval: NotificationInterval;
  day?: number;
  dayOfWeek?: number;
  time: string;
}

const NotificationScheduleSchema = new mongoose.Schema<NotificationSchedule>({
  emails: {
    type: [String],
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
  interval: {
    type: String,
    enum: [
      NotificationInterval.Daily,
      NotificationInterval.Weekly,
      NotificationInterval.Monthly,
    ],
    required: true,
  },
  day: {
    type: Number,
    min: 1,
    max: 31,
    required: function () {
      return this.interval === NotificationInterval.Monthly;
    },
  },
  dayOfWeek: {
    type: Number,
    min: 0,
    max: 6,
    required: function () {
      return this.interval === NotificationInterval.Weekly;
    },
  },
  time: {
    type: String,
    required: true,
  },
});

export default mongoose.models?.NotificationSchedule ||
  mongoose.model("NotificationSchedule", NotificationScheduleSchema);
