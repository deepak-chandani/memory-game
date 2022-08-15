import React, { useReducer } from "react"
import { gameReducer, initialState } from "./gameReducer"

export const GameContext = React.createContext()

export function GameProvider({children}){
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const value = [
    state,
    dispatch
  ]

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}