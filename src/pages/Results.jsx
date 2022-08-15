import styled from "styled-components";
import { startGame } from "../context/dispatchers";
import { useGame } from "../context/hooks";

import { Button } from "../styles/common";

const Container = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Results() {
  const [{timeTaken, moveCount}, dispatch] = useGame()

  const handleStart = () => {
    startGame(dispatch)
  }

  return (
    <Container>
      <header>
        <h2>Score</h2>

      </header>
      <div>
        <div>
          <p>Horray! 🎉🥳  Game completed in <strong>{moveCount} moves</strong></p>
          <p>Time Taken (mm:ss): <strong>{timeTaken}</strong></p>
        </div>
        <Button large onClick={handleStart}>
          Play Again
        </Button>
      </div>
    </Container>
  );
}
