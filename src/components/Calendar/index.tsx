import React from "react";
import { Dayjs } from "dayjs";
import Header from "./Header";
import Weeks from "./Weeks";
import Dates from "./Dates";
import styled from "styled-components";
import { setDates } from "../DatePicker";
import { dates } from "../RangePicker";

interface CalendarProps {
  currentMonth: Dayjs;
  setDates: setDates;
  dates: dates;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  setDates,
  dates,
}) => {
  return (
    <StyledWrapper>
      <Header currentMonth={currentMonth} />
      <Weeks />
      <Dates currentMonth={currentMonth} setDates={setDates} dates={dates} />
    </StyledWrapper>
  );
};

export default Calendar;

const StyledWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: var(--neutral-color);
`;
