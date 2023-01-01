import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { setDates } from "../DatePicker";
import { dates } from "../RangePicker";

interface DateProps {
  currentMonth: Dayjs;
  setDates: setDates;
  dates: dates;
}

interface DateFormat {
  dateFormat: Dayjs | null;
  date?: number;
  months?: number;
  years?: number;
  isToday?: boolean;
  isDisabled: boolean;
}

const Dates: React.FC<DateProps> = ({ currentMonth, setDates, dates }) => {
  const FORMAT = "YYYY-MM-DD";
  const TODAY = dayjs().startOf("day");
  const [weeks, setWeeks] = useState<DateFormat[][]>([]);
  const [hover, setHover] = useState<Dayjs | null>(null);
  const dateTypeMap = {
    selected: "selected",
    between: "between",
    default: "",
  };

  const checkRange = (day: DateFormat) => {
    const { startDate, endDate, type } = dates;
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
  };

  const checkDate = (dateFormat: Dayjs | null) => {
    if (!dateFormat) return "default";
    if (dateFormat.isSame(dates.startDate) || dateFormat.isSame(dates.endDate))
      return "selected";
    if (dateFormat.isBetween(dates.startDate, dates.endDate)) return "between";
    return "default";
  };

  const toDateObject = (dateFormat: Dayjs): DateFormat => {
    const { date, months, years } = dateFormat.toObject();

    return {
      dateFormat,
      date,
      months,
      years,
      isDisabled: dateFormat.isBefore(TODAY),
    } as const;
  };

  const getWeekDates = (current: Dayjs) => {
    const dates: DateFormat[] = [];
    for (let i = 0; i < 7; i++) {
      const dateObject = toDateObject(current);
      currentMonth.month() !== dateObject.months
        ? dates.push({ dateFormat: null, isDisabled: true })
        : dates.push(dateObject);
      current = current.add(1, "day");
    }
    return { dates, current };
  };

  const getDates = useCallback(() => {
    let current = currentMonth.startOf("month").weekday(0);
    let nowMonth = current.month();
    const nextMonth = currentMonth.add(1, "month").month();
    const weekArr: DateFormat[][] = [];

    while (nowMonth !== nextMonth) {
      const { dates, current: nowCurrent } = getWeekDates(current);
      current = nowCurrent;
      nowMonth = current.month();
      weekArr.push(dates);
    }
    setWeeks(weekArr);
  }, [currentMonth]);

  useEffect(() => getDates(), [currentMonth, getDates]);

  return (
    <StyledWrapper>
      {weeks.map((week, index) => (
        <div className="row" key={index}>
          {week.map((day, index) => {
            const { isDisabled, dateFormat } = day;
            const dateType = dateTypeMap[checkDate(dateFormat)];
            return (
              <div
                className={`col cell ${
                  isDisabled ? "disabled" : "abled"
                } ${dateType} ${
                  !!hover &&
                  !!dates.startDate.length &&
                  (dateFormat?.isBetween(dates.startDate, hover) ||
                    dateFormat?.isSame(hover)) &&
                  "between"
                }`}
                key={index}
                onClick={() => {
                  if (!dateFormat) return;
                  if (dateFormat.isBefore(TODAY)) return;
                  checkRange(day);
                }}
                onMouseEnter={() => {
                  if (!!dates.startDate.length && !!dates.endDate.length)
                    return;
                  !!dates.startDate.length &&
                    dateFormat &&
                    setHover(dateFormat);
                }}
                onMouseLeave={() => setHover(null)}
              >
                <span className="number">{day ? day.date : day}</span>
              </div>
            );
          })}
        </div>
      ))}
    </StyledWrapper>
  );
};

export default Dates;

const StyledWrapper = styled.div`
  font-family: "Open Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 1em;
  font-weight: 300;
  line-height: 1.5;
  color: var(--text-color);
  background: var(--bg-color);
  position: relative;
  .row {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
  .col {
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
  }
  .cell {
    position: relative;
    height: 3.2em;
    border-right: 2px solid var(--border-color);
    overflow: hidden;
    cursor: pointer;
    background: var(--neutral-color);
    transition: 0.25s ease-out;
    border-bottom: 2px solid var(--border-color);
    :first-child {
      border-left: 2px solid var(--border-color);
    }
    .number {
      position: absolute;
      font-size: 82.5%;
      line-height: 1;
      top: 0.75em;
      right: 0.75em;
      font-weight: 700;
    }
  }
  .selected {
    background: rgb(0, 166, 153) !important;
    border: 1px double rgb(0, 166, 153) !important;
    color: white;
  }
  .between {
    background: rgb(102, 226, 218) !important;
    border: 1px double rgb(51, 218, 205) !important;
    color: rgb(255, 255, 255) !important;
  }
  .abled {
    :hover {
      background-color: #9c9c9c;
    }
  }
  .disabled {
    opacity: 0.5;
    cursor: auto;
    :hover {
    }
  }
`;
