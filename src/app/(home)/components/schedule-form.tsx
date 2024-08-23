"use client";

import { SearchOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Input,
  Select,
  Button,
  TimePicker,
  InputNumber,
  message,
  Typography,
  Row,
  Col,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";

import { FormDefaultValues, NotificationInterval } from "@/lib/db/types";
import {
  notificationScheduleValidationSchema,
  NotificationScheduleValues,
} from "@/lib/db/validation/notification-schedule.validation";

import { saveSchedule } from "../actions";

const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const TIME_FORMAT = "HH:mm";

interface Props {
  latestNotificationSchedule: FormDefaultValues;
}

export default function ScheduleForm({ latestNotificationSchedule }: Props) {
  const defaultValues = latestNotificationSchedule
    ? {
        ...latestNotificationSchedule,
        time: dayjs(latestNotificationSchedule.time, TIME_FORMAT),
      }
    : {};
  const {
    control,
    handleSubmit,
    watch,
    formState: { isLoading },
  } = useForm<NotificationScheduleValues>({
    resolver: zodResolver(notificationScheduleValidationSchema),
    defaultValues,
  });

  const interval = watch("interval");

  const onSubmit = async (values: NotificationScheduleValues) => {
    try {
      await saveSchedule({
        ...values,
        time: (values.time as Dayjs).format(TIME_FORMAT),
      });
      message.success("Preferences saved successfully!");
    } catch (error) {
      message.error("Error saving preferences. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Title>Manage Bid Notifications</Title>
      <Text>
        Configure your email notification settings for relevant business bids.
      </Text>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <FormItem control={control} name="searchQuery" label="Search Query">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Enter your search query"
          />
        </FormItem>
        <FormItem control={control} name="emails" label="Email List">
          <TextArea rows={4} placeholder="Enter emails" />
        </FormItem>

        <Row gutter={12}>
          <Col span={12}>
            <FormItem
              control={control}
              name="interval"
              label="Notification Interval"
            >
              <Select placeholder="Select interval">
                {Object.entries(NotificationInterval).map(([key, value]) => (
                  <Option key={key} value={value}>
                    {key}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            {interval === NotificationInterval.Weekly && (
              <FormItem
                control={control}
                name="dayOfWeek"
                label="Weekly Notification Day"
                required
              >
                <Select placeholder="Select day of week">
                  {DAYS_OF_WEEK.map((day, index) => (
                    <Option key={index} value={index}>
                      {day}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            )}

            {interval === NotificationInterval.Monthly && (
              <FormItem
                control={control}
                name="day"
                label="Monthly Notification Day"
                required
              >
                <InputNumber min={1} max={31} />
              </FormItem>
            )}
          </Col>
        </Row>

        <FormItem control={control} name="time" label="Notification Time (UTC)">
          <TimePicker format={TIME_FORMAT} />
        </FormItem>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<ClockCircleOutlined />}
            loading={isLoading}
          >
            Save Schedule
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
