import { Dayjs } from "dayjs";

export const getNextMonth = (currentMonth: Dayjs) =>
  currentMonth.add(1, "month");

export const getPrevMonth = (currentMonth: Dayjs) =>
  currentMonth.subtract(1, "month");
