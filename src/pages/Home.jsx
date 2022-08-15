import styled from "styled-components";
import { startGame } from "../context/dispatchers";
import { useGameDispatch } from "../context/hooks";

import { Button } from "../styles/common";

const Container = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  const dispatch = useGameDispatch()

  const handleStart = () => {
    startGame(dispatch)
  }

  return (
    <Container>
      <header>
        <h1>Memory Game</h1>
      </header>
      <div>
        <Button large onClick={handleStart}>
          Start
        </Button>
      </div>
    </Container>
  );
}
