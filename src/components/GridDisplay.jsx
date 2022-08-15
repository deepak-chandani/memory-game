import React, { useEffect } from "react"
import styled from "styled-components";
import { closeCards, openCard, removeMatchedCards } from "../context/dispatchers";
import { useGame } from "../context/hooks";
import Card from "./Card";


const Grid = styled.div.attrs((props) => ({
  style: {
    gridTemplateRows: `repeat(${props.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
    width: `${props.width - 20}px`,
    height: `${((props.width - 20) / props.cols) * props.rows}px`,
    maxHeight: `${props.rows * 100}px`,
    maxWidth: `${props.cols * 100}px`,
  },
}))`
  display: grid;
  grid-gap: 4px;
  background-color: #8eb7d7;
  border: 2px solid #8eb7d7;
  transition: all 0.25s;
`;


function GridDisplay({windowWidth}){
  const [{cards: grid, rows, cols, openedCards}, dispatch] = useGame()

  const windowHeight = window.innerHeight - 230;
  if (windowWidth > windowHeight) {
    windowWidth = windowHeight;
  }

  useEffect(() => {
    if(openedCards.length === 2){
      const [c1, c2] = openedCards
      const isMatchFound = c1.value === c2.value

      setTimeout(() => {
        if(!isMatchFound){
          closeCards(dispatch, openedCards)
        } else {
          removeMatchedCards(dispatch)
        }
      }, 600);
    }

  }, [openedCards, dispatch])

  const handleCellClick = (e) => {
    if(openedCards.length >= 2){
      return
    }

    const target = e.target
    if(target.classList.contains("card")){
      const {dataset} = target
      const rowIndex = parseInt(dataset.rowIndex)
      const colIndex = parseInt(dataset.colIndex)
      const card = grid[rowIndex][colIndex]

      if(card.isOpen || card.isMatched){
        return
      }

      openCard(dispatch, card)
    }

  }

  return (
    <Grid rows={rows} cols={cols} width={windowWidth} onClick={handleCellClick}>
      {grid.map((row, rowIndex) => {
          return row.map((card, colIndex) => {
            const key = `${rowIndex}-${colIndex}`
            return <Card key={key} rowIndex={rowIndex} colIndex={colIndex} value={card.value} isOpen={card.isOpen} isMatched={card.isMatched} />
          })
        })
      }
    </Grid>
  )
}

export default GridDisplay