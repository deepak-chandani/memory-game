import { createRandomGrid } from "../utils/createRandomCards"
import {ActionTypes} from "./gameReducer"
import config from "../config"

// helper fns that dispatch appropriate actions

export function openCard(dispatch, card){
  dispatch({type: ActionTypes.OPEN_CARD, payload: {card}})
}

export function closeCards(dispatch, cards){
  dispatch({type: ActionTypes.CLOSE_CARDS, payload: {cards}})
}

export function removeMatchedCards(dispatch){
  dispatch({type: ActionTypes.REMOVE_MATCHED_CARDS, payload: null})
}

export function startGame(dispatch){
  const {rows, cols} = config
  const cards = createRandomGrid(rows, cols)

  console.log("cards created", cards)

  dispatch({
    type: ActionTypes.START_GAME,
    payload: {cards, rows, cols}
  })
}

export function gameCompleted(dispatch, payload){
  dispatch({type: ActionTypes.GAME_COMPLETED, payload})
}