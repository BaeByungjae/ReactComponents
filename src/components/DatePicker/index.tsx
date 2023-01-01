import dayjs from "dayjs";
import { useState } from "react";
import Calendar from "../Calendar";
import styled from "styled-components";
import { getNextMonth, getPrevMonth } from "../Calendar/module";
import { dayJsExtend } from "./module";
import { dates } from "../RangePicker";

export type setDates = React.Dispatch<React.SetStateAction<dates>>;

const DatePicker = ({
  setDates,
  dates,
}: {
  setDates: setDates;
  dates: dates;
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  dayJsExtend();

  return (
    <StyledWrapper>
      <div
        className="dayPicker__btn left"
        onClick={() => setCurrentMonth(getPrevMonth(currentMonth))}
      >
        {"<"}
      </div>
      <Calendar currentMonth={currentMonth} setDates={setDates} dates={dates} />
      <Calendar
        currentMonth={currentMonth.add(1, "month")}
        setDates={setDates}
        dates={dates}
      />
      <div
        className="dayPicker__btn right"
        onClick={() => setCurrentMonth(getNextMonth(currentMonth))}
      >
        {">"}
      </div>
    </StyledWrapper>
  );
};

export default DatePicker;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 10px;
  width: 800px;
  gap: 1rem;
  margin-top: 10px;
  background: var(--neutral-color);
  .dayPicker__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 40px;
    height: 40px !important;
    position: absolute;
    border: 1px solid rgb(228, 231, 231) !important;
    z-index: 10;
    cursor: pointer;
  }
  .left {
    left: 15px;
    top: 2.8em;
  }
  .right {
    right: 15px;
    top: 2.8em;
  }
`;
