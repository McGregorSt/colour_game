import * as actionTypes from './actionTypes'

export const generateBoardSuccess = (board) => {
  return {
    type: actionTypes.GENERATE_BOARD,
    board: board
  }
}

export const checkNeighboursSuccess = (neighbours) => {
  return {
    type: actionTypes.CHECK_NEIGHBOURS,
    neighbours: neighbours
  }
}

export const generateBoard = () => {
  return dispatch => {
    const colors = [
      'FFC09F',
      'FFEE93',
      'FCF5C7',
      'A0CED9',
      'ADF7B6'
    ]
  
    const colorGenerator = (colors) => {
      let random = Math.ceil(Math.random() * (5 - 1)) + 1
      return `#${colors[random - 1]}`
    }
  
    let newBoard = []
    for (let i = 0; i < 5; i ++) {
      for (let j = 0; j < 10; j++) {
        let randomColor = colorGenerator(colors)
        let newSq = {corX: i, corY: j, color: `${randomColor}`, id: `${i}${j}`}
        newBoard.push(newSq)
      }
    }
    return dispatch(generateBoardSuccess(newBoard))
  }
}

export const checkNeighbours = (ev, board) => {
  return dispatch => {
    let dataValue = ev.target.dataset.value
    let clickedSquare = board[ev.target.dataset.value]
    console.log(clickedSquare)
    let dataColor = ev.target.dataset.color
    let neighbours = []
    let goodNeighbours = []
    let allGoodSquares = []

    const checkGoodNeighbours = (checkSq) => {
      if (neighbours.length === 0) {
        checkSq = clickedSquare
      }
      console.log('here', checkSq)
      let down = board.filter(elm => elm.corX === checkSq.corX + 1 && elm.corY === checkSq.corY)
      let up = board.filter(elm => elm.corX === checkSq.corX - 1 && elm.corY === checkSq.corY)
      let left = board.filter(elm => elm.corX === checkSq.corX && elm.corY === checkSq.corY - 1)
      let right = board.filter(elm => elm.corX === checkSq.corX && elm.corY === checkSq.corY + 1)
  

      if (checkSq.corX === 0) {
        neighbours.push(right, down, left)
        goodNeighbours = neighbours.filter(elm => elm[0].color === checkSq.color)
        return goodNeighbours
      } else if (checkSq.corX === 4) {
        neighbours.push(right, up, left)
        goodNeighbours = neighbours.filter(elm => elm[0].color === checkSq.color)
        return goodNeighbours
      } else if (checkSq.corY === 0) {
        neighbours.push(up, down, right)
        goodNeighbours = neighbours.filter(elm => elm[0].color === checkSq.color)
        return goodNeighbours
      } else if (checkSq.corY === 9) {
        neighbours.push(left, down, up)
        goodNeighbours = neighbours.filter(elm => elm[0].color === checkSq.color)
        return goodNeighbours
      } else {
        neighbours.push(up, right, down, up)
        goodNeighbours = neighbours.filter(elm => elm[0].color === checkSq.color)
        return goodNeighbours
      }
      
    }

    console.log(checkGoodNeighbours())

    const checkAllGoodNeighbours = () => {
      if (goodNeighbours.length > 0) {
        goodNeighbours.forEach(elm => {
          console.log('elm', elm)
          checkGoodNeighbours(elm[0])
          allGoodSquares = [...allGoodSquares, goodNeighbours]
        })
      }
      return console.log(allGoodSquares)
    }
    checkAllGoodNeighbours()


    

    //   if (clickedSquare.corY === 0) {
    //     let up = null
    //     return null
    //   } 
    //   return console.log('blaa', board[parseInt(dataValue) - 10], dataColor)
    // }
    console.log(board[dataValue].corX, board[dataValue].corY)
    return console.log(parseInt(dataValue), dataColor)
  }
}