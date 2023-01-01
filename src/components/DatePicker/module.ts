import isTodayPlugin from "dayjs/plugin/isToday";
import toObjectPlugin from "dayjs/plugin/toObject";
import weekDayPlugin from "dayjs/plugin/weekday";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import isSameOrAfterPlugin from "dayjs/plugin/isSameOrAfter";
import dayjs from "dayjs";

export const dayJsExtend = () => {
  dayjs.extend(isTodayPlugin);
  dayjs.extend(toObjectPlugin);
  dayjs.extend(weekDayPlugin);
  dayjs.extend(isBetweenPlugin);
  dayjs.extend(isSameOrAfterPlugin);
};
