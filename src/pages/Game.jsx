import { useCallback, useEffect } from "react";
import { useMeasure } from "react-use";

import { FlexColumnCenter } from "../styles/common";
import GridDisplay from "../components/GridDisplay";
import GameOver from "../components/GameOver";
import { useGame } from "../context/hooks";
import ScoreBar from "../components/ScoreBar";
import useTimer from "../hooks/useTimer";
import { gameCompleted } from "../context/dispatchers";

export default function Game() {
  const [{isGameOver, remainingMatches}, gameDispatch] = useGame()
  const [ref, { width }] = useMeasure();
  const {formattedTime, start, stop, dispatch} = useTimer()

  useEffect(() => {
    start(dispatch)

    return () => {
      stop(dispatch)
    }
  }, [])

  useEffect(() => {
    if(remainingMatches === 0){
      const timeTaken = formattedTime
      stop(dispatch)

      setTimeout(() => {
        const payload = {
          timeTaken
        }
        gameCompleted(gameDispatch, payload)
      }, 10)
    }
  }, [remainingMatches, gameDispatch])

  return (
    <FlexColumnCenter ref={ref} style={{ position: "relative" }}>
      <ScoreBar time={formattedTime} />
      <GridDisplay windowWidth={width} />
      <GameOver isGameOver={isGameOver} />
    </FlexColumnCenter>
  );
}
