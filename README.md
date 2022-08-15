## What is in this README file
- This file contains the analysis which I did before coding the solution.
- Basically its explanation of my thought process while reaching to the solution.
- **NOTE:** this was written before coding the solution so there will be little differences in actual implementation
## Requirements
  - Cards should be laid out on a 6x6 grid, all face down initially (i.e. numbers not showing)
  - There should be a total of 36 cards with the numbers 1-18 (two of each), placed randomly on the grid
  - Clicking a card should 'reveal' it - showing the hidden number of the card
  - Clicking a second card should reveal that card
  - If the second card has the same number as the first card, both cards should be removed from the board after 3 seconds
  - If the second card has a different number to the first card, both cards should be 'hidden' again after 3 seconds (i.e. turned face down)
  - The user shouldn't be able to turn over any more cards until the 3 second timer completes and the two revealed cards are either removed (if they matched), or hidden again (if they didn't)
  - Once all cards are removed from the board, the game is over and the 'Play again' button should be shown
  - Clicking **'Play again'** should generate a new, random set of cards on the grid
## Analysis
- It contains my thoughts on following areas:
  - What data structure to use for storing `Grid` & `Card` data
  - What pieces of data should be kept in state
  - Different components & How to structure different components
  - Provider pattern using `Context API` & `useReducer` (`GameProvider`)
  - custom hooks: `useGame()`, `useCards()` etc
  - Different possible user actions & dispatchers corresponding to those actions
    - eg: `startGame()`, `openCard(card)`, `closeCards([cards])`

## Data structure & pieces of state
- `const cards = Card[][]` - 2D array to hold 6x6 grid
- each `Card` has
```ts
type Card {
  value: number,
  isOpen: boolean,
  isMatched: boolean, // when card is matched
  index: number // position of card
}

 type Position {
   row: number,
   column: number
 }
```
- `openedCards[]` - at max only 2 cards can be opened at a time
  - if two cards are opened & they do not match then they will be closed after 1 seconds
  - when `(openCards.length >= 2)` (and not matching) then `setTimeout(closeCards, 1000)` // NOTE: sideEffect
  -

### steps to ToDo when card opens `handleReveal()`
- should not dispatch anything when openCards.length === 2
- `dispatch(openCard(card))`
- NOTE: effect:
  - when `(openCards.length >= 2)`
    -  `!matchFound` then `setTimeout(closeCards, 1000)` // NOTE: sideEffect
    -  `matchFound` then `setTimeout(() => dispatch(removeMatchedCards(c1,c2)), 1000)`

## Component structure
- `Game` Component
  - will have following state
```ts
 type GameState {
   cards: Card[][],
   openedCards: Card[],
   matchFound: boolean,
   moveCount: 0,
   isGameOver: false,
   status: "RUNNING" | "OVER" | "COMPLETED" | null,
   rows: number,
   cols: number,
   timeTaken: string // when game completes we capture timeTaken & show in results screen
 }

```
- `Card` Component
```jsx
  <Card isMatched value={} isOpen onReveal={fn} />
   // onClick of closed Card it invokes onReveal()
```

## Interactions & Actions dispatched
```js
 {type:  'START_GAME' payload: card}
 {type:  'OPEN_CARD' payload: card}

// can be invoked when we want single or multiple cards to be closed
 {type:  'CLOSE_CARDS' payload: [card]}

// dispatched when `matchFound` & after 1 second we want to REMOVE_MATCHED_CARD by marking those cards as `isMatched=true`
 {type:  'REMOVE_MATCHED_CARDS' payload: {card1, card2}}
```
```js
 // NOTE: might not be needed, as this can be computed when second card is opened
 {type:  'CARDS_MATCHED' payload: {card1, card2}}
```

## state Provider & hooks
```jsx
 <GameProvider>
   <Board>
     <Card />
     <Card />
     .
     .
     .
   </Board>
 </GameProvider>

// hooks
const cards = useCards()
const openCards = useOpenCards()
const gameState = useGame()
const dispatch = useGameDispatch()

// helper fns that dispatch appropriate actions
openCard(card)
closeCards([card])
removeMatchedCards()

```

## When game start-button is clicked
```js
const cards = createRandomCards(row, cols)
```


## Utilities
- `const getRandomNumber = buildGenerator(1, 18)`

----------------------------------------
## Extra features Deepak ToDo (add these)
- `ScoreBar` shown at top which displays following data
  - number Of moves: {count}
  - Time Taken
