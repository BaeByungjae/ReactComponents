import React, { useState } from "react";
import styled from "styled-components";
import DateInput from "../DateInput";
import DatePicker from "../DatePicker";

export interface dates {
  startDate: string;
  endDate: string;
  type: "Start" | "End" | null;
}

const RangePicker = () => {
  const [isCalendar, setIsCalendar] = useState(false);
  const initDates = {
    startDate: "",
    endDate: "",
    type: null,
  };
  const [dates, setDates] = useState<dates>(initDates);

  return (
    <StyledWrapper>
      <DateInput
        dates={dates}
        setDates={setDates}
        onClick={() => setIsCalendar(true)}
      />
      <div className="date-picker__wrapper">
        <div className="picker-wrapper" onClick={() => setIsCalendar(false)} />
        {isCalendar && <DatePicker setDates={setDates} dates={dates} />}
      </div>
    </StyledWrapper>
  );
};

export default RangePicker;

const StyledWrapper = styled.div`
  .date-picker__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .picker-wrapper {
      position: fixed;
      width: 100%;
      height: 100%;
      background: none;
    }
  }
`;
