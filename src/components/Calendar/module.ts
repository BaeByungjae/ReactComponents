import dayjs, { Dayjs } from "dayjs";
import { setDates } from "../DatePicker";
import { dates } from "../RangePicker";
import { DateFormat } from "./Dates";

export const TODAY = dayjs().startOf("day");

export const getNextMonth = (currentMonth: Dayjs) =>
  currentMonth.add(1, "month");

export const getPrevMonth = (currentMonth: Dayjs) =>
  currentMonth.subtract(1, "month");

export const checkDatesFactory = (dates: dates, setDates: setDates) => {
  const { startDate, endDate, type } = dates;

  return {
    checkRange: (day: DateFormat) => {
      const FORMAT = "YYYY-MM-DD";

      const { dateFormat } = day;
      if (type === "Start") {
        setDates({
          startDate: dateFormat?.format(FORMAT) as string,
          endDate: "",
          type: "End",
        });
        return;
      }
      if (!!startDate) {
        if (dateFormat?.isSameOrAfter(startDate)) {
          setDates({
            startDate,
            endDate: dateFormat?.format(FORMAT) as string,
            type: "Start",
          });
          return;
        }
        setDates({
          startDate: dateFormat?.format(FORMAT) as string,
          endDate,
          type: "End",
        });
        return;
      }
      setDates({
        startDate,
        endDate: dateFormat?.format(FORMAT) as string,
        type: "Start",
      });
    },

    checkDate: (dateFormat: Dayjs | null) => {
      if (!dateFormat) return "default";
      if (
        dateFormat.isSame(dates.startDate) ||
        dateFormat.isSame(dates.endDate)
      )
        return "selected";
      if (dateFormat.isBetween(dates.startDate, dates.endDate))
        return "between";
      return "default";
    },
  };
};

export const toDateObject = (dateFormat: Dayjs): DateFormat => {
  const { date, months, years } = dateFormat.toObject();
  return {
    dateFormat,
    date,
    months,
    years,
    isDisabled: dateFormat.isBefore(TODAY),
  } as const;
};

export const isDateValid = (date: string) => !!date.length;
