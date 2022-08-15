import React, { useEffect } from "react"
import styled from "styled-components"
import { useGame } from "../context/hooks"
import useTimer from "../hooks/useTimer"

const Wrapper = styled.div`
  display: flex;
  padding: 10px 15px;
  margin: 8px;
  justify-content: space-between;
  box-shadow: 0 4px 16px rgba(0,0,0,.2);
  border-radius: 8px;
  color: #3c3c3c;
  width: 95%;
  max-width: 400px;
`

function ScoreBar({time}){
  const [{moveCount}] = useGame()

  return (
    <Wrapper>
      <div>Number of moves: {moveCount}</div>
      <TimeWrapper>⏱ {time}</TimeWrapper>
    </Wrapper>
  )
}


const TimeWrapper = styled.div`
  min-width: 70px;
`

/**
 * I was trying to create separate Timer component
 * but then I had to change decision & lifted the timer state up to Game component
 * so this 👇 Timer component is not being used
 */
function Timer(){
  const {formattedTime, start, stop, dispatch} = useTimer()

  useEffect(() => {
    start(dispatch)

    return () => {
      stop(dispatch)
    }
  }, [])

  return <TimeWrapper>⏱ {formattedTime}</TimeWrapper>
}

const MemoizedTimer = React.memo(Timer)

export default React.memo(ScoreBar)
