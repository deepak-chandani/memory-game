import Card from "./Card"

function buildGenerator(min, max){
  const items = []
  for(let i=min; i<=max; i++){
    items.push(i)
  }

  return () => {
    if(items.length === 0){
      return false
    }
    const i = getRandomInt(items.length)
    const n = items[i]
    items.splice(i, 1) // remove that item at index i
    return n
  }
}

export function createRandomGrid(rows, cols){
  const maxNumLimit = rows*cols/2
  const maxCellIndex = (rows*cols) -1
  const getRandomNumber = buildGenerator(1, maxNumLimit)
  const getRandomPosition = buildGenerator(0, maxCellIndex)
  const grid = createEmptyGrid(rows, cols)


  let pos1 = getRandomPosition()
  let pos2 = getRandomPosition()
  while(pos1!==false && pos2!==false){
    const value = getRandomNumber()
    let card = new Card(value)
    let [i, j] = findGridIndexFromPosition(pos1, rows)
    grid[i][j] = card
    card.position = [i, j]

    const indexes = findGridIndexFromPosition(pos2, rows)
    i = indexes[0]
    j = indexes[1]
    card = new Card(value)
    grid[i][j] = card
    card.position = indexes

    pos1 = getRandomPosition()
    pos2 = getRandomPosition()
  }

  return grid
}

function createEmptyGrid(rows, cols){
  const grid = []
  for(let i=0 ; i<rows; i++){
    grid.push([])
    for(let j=0 ; j<rows; j++){
      grid[i].push(0)
    }
  }

  return grid
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 *
 * @param {number} pos
 * @param {number} rows
 * @returns {[number, number]}
 */
function findGridIndexFromPosition(pos, rows){
  const i = Math.floor(pos/rows)
  const j = Math.floor(pos%rows)

  return [i, j]
}