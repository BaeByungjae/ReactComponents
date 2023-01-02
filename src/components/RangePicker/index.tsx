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
      {isCalendar && (
        <div className="picker-wrapper" onClick={() => setIsCalendar(false)} />
      )}
      <div className="date-picker__wrapper">
        {isCalendar && <DatePicker setDates={setDates} dates={dates} />}
      </div>
    </StyledWrapper>
  );
};

export default RangePicker;

const StyledWrapper = styled.div`
  position: relative;
  .date-picker__wrapper {
    position: relative;
    width: 800px;
    height: 100%;
    z-index: 10;
  }
  .picker-wrapper {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;
