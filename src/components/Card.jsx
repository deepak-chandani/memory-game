import styled from "styled-components";

const CardDiv = styled.div`
  background-color: ${(props) => props.isMatched ? "#b4f1b4" : "#FFF"};
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
`;

export default function Card({
  value,
  rowIndex,
  colIndex,
  backgroundColor,
  isOpen,
  isMatched,
}) {
  return (
    <CardDiv
      className="card"
      data-row-index={rowIndex}
      data-col-index={colIndex}
      backgroundColor={backgroundColor}
      isMatched={isMatched}
    >
      {isOpen ? value : null}
    </CardDiv>
  );
}
