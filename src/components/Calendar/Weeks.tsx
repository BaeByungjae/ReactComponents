import styled from "styled-components";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

const Weeks = () => {
  return (
    <StyledWrapper>
      {days.map((day) => (
        <div className="col col-center" key={day}>
          {day}
        </div>
      ))}
    </StyledWrapper>
  );
};

export default Weeks;

const StyledWrapper = styled.div`
  text-transform: uppercase;
  font-weight: 400;
  color: var(--text-color-light);
  font-size: 70%;
  padding: 0.75em 0;
  border: 2px solid var(--border-color);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  .col {
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
  }
  .col-center {
    justify-content: center;
    text-align: center;
  }
`;
