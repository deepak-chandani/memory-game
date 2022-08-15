import React from "react"

function GameOver({isGameOver}){
  if(!isGameOver){
    return null
  }

  return (
    <div>
      GameOver
    </div>
  )
}

export default GameOver