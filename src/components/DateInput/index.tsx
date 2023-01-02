import React from "react";
import styled from "styled-components";
import { dates } from "../RangePicker";
import Input from "./Input";

interface DateInputProps {
  dates: dates;
  setDates: React.Dispatch<React.SetStateAction<dates>>;
  onClick: () => void;
}

const DateInput: React.FC<DateInputProps> = ({ dates, setDates, onClick }) => {
  return (
    <StyledWrapper>
      <Input
        dates={dates}
        setDates={setDates}
        inputType={"Start"}
        onClick={onClick}
      />
      <div className="arrow" />
      <Input
        dates={dates}
        setDates={setDates}
        inputType={"End"}
        onClick={onClick}
      />
    </StyledWrapper>
  );
};

export default DateInput;

const StyledWrapper = styled.div`
  display: inline-flex;
  position: relative;
  border: 1px solid black;
  z-index: 10;
  .input {
    border: none;
    outline: none;
    padding: 10px;
    background-color: var(--bg-color);
  }
  .arrow {
    position: relative;
  }

  .arrow::after {
    position: absolute;
    right: 12px;
    top: 12px;
    content: "";
    width: 10px; /* 사이즈 */
    height: 10px; /* 사이즈 */
    border-bottom: 2px solid #000; /* 선 두께 */
    border-left: 2px solid #000; /* 선 두께 */
    transform: rotate(225deg); /* 각도 */
  }
`;
