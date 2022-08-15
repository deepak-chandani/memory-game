import { useContext } from "react"
import { GameContext } from "./GameProvider"

export function useGame(){
  return useContext(GameContext)
}

export function useGameDispatch(){
  const [,dispatch] = useGame()
  return dispatch
}

export function useCards(){
  const [{cards}] = useGame()
  return cards
}