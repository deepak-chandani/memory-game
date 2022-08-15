import config from "../config"
import Card from "../utils/Card"

export const ActionTypes = {
  'START_GAME': 'START_GAME',
  'SET_CARDS': 'SET_CARDS',
  'OPEN_CARD': 'OPEN_CARD',
  'CLOSE_CARDS': 'CLOSE_CARDS',
  'REMOVE_MATCHED_CARDS': 'REMOVE_MATCHED_CARDS',
  'GAME_COMPLETED': 'GAME_COMPLETED',
}

export const GameStatus = {
  "RUNNING": "RUNNING",
  "OVER": "OVER",
  "COMPLETED": "COMPLETED",
}

const {rows, cols} = config
export const initialState = {
   cards: null,
   openedCards: null,
   matchFound: false,
   moveCount: 0,
   isGameOver: false,
   status: null, // RUNNING, OVER, COMPLETED
   rows,
   cols,
   remainingMatches: (rows*cols)/2,
   timeTaken: ""
}

export function gameReducer(state, action){
  const {payload} = action

  switch(action.type){
    case ActionTypes.START_GAME: {
      const {cards, rows, cols} = payload
      return {
        ...initialState,
        cards,
        rows,
        cols,
        status: GameStatus.RUNNING,
        openedCards: [],
        remainingMatches: (rows*cols)/2
      }
    }

    case ActionTypes.OPEN_CARD: {
      const {card} = payload
      const newCard = Card.buildfromCard(card)
      newCard.isOpen = true
      const [i, j] = newCard.position
      const cards = state.cards
      cards[i][j] = newCard
      const openedCards = state.openedCards.concat(newCard)

      return {
        ...state,
        cards,
        openedCards,
        moveCount: state.moveCount+1
      }
    }

    case ActionTypes.CLOSE_CARDS: {
      const {openedCards} = state
      openedCards.forEach(card => card.isOpen = false)

      return {
        ...state,
        openedCards: []
      }
    }

    case ActionTypes.REMOVE_MATCHED_CARDS: {
      const {openedCards} = state
      openedCards.forEach(card => card.isMatched = true)

      return {
        ...state,
        openedCards: [],
        remainingMatches: state.remainingMatches-1
      }
    }

    case ActionTypes.GAME_COMPLETED: {
      const {timeTaken} = payload

      return {
        ...state,
        status: GameStatus.COMPLETED,
        timeTaken
      }
    }

    default: {
      return state
    }
  }
}
