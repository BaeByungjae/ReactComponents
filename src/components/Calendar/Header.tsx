import { Dayjs } from "dayjs";
import React from "react";
import styled from "styled-components";

const Header = ({ currentMonth }: { currentMonth: Dayjs }) => {
  const FORMAT = "MMMM YYYY";

  return (
    <StyledWrapper>
      <div className="col col-center">
        <span>{currentMonth.format(FORMAT)}</span>
      </div>
    </StyledWrapper>
  );
};

export default Header;

const StyledWrapper = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 115%;
  padding: 1.5em 0;
  background-color: transparent;
`;
