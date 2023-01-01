import React, { useEffect, useRef } from "react";
import { setDates } from "../DatePicker";
import { dates } from "../RangePicker";

interface inputProps {
  dates: dates;
  setDates: setDates;
  inputType: "Start" | "End" | null;
  onClick: () => void;
}

const Input: React.FC<inputProps> = ({
  dates,
  setDates,
  inputType,
  onClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const date = inputType === "Start" ? dates.startDate : dates.endDate;
    if (!date.length && inputType === dates.type) inputRef.current?.focus();
  }, [dates]);

  return (
    <input
      ref={inputRef}
      className={"input start"}
      value={inputType === "Start" ? dates.startDate : dates.endDate}
      onChange={() => console.log(dates.startDate)}
      onClick={() => {
        onClick();
        setDates({ ...dates, type: inputType });
      }}
      placeholder={`${inputType}Date`}
    />
  );
};

export default Input;
