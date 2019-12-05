import * as actionTypes from './actionTypes'

export const generateBoardSuccess = board => {
  return {
    type: actionTypes.GENERATE_BOARD,
    board: board,
  }
}

export const checkNeighboursSuccess = (neighbours, clicked, counter) => {
  return {
    type: actionTypes.CHECK_NEIGHBOURS,
    neighbours: neighbours,
    clicked: clicked,
    counter: counter,
  }
}

export const squaresToMove = toMove => {
  return {
    type: actionTypes.SQUARES_TO_MOVE,
    toMove: toMove,
  }
}

export const squaresToRegenerate = toRegenerate => {
  return {
    type: actionTypes.SQUARES_TO_REGENERATE,
    toRegenerate: toRegenerate,
  }
}

const colorGenerator = colors => {
  let random = Math.ceil(Math.random() * 5)
  console.log(random)
  return `#${colors[random - 1]}`
}

export const generateBoard = () => {
  return (dispatch, getState) => {
    const colors = getState().colors

    let newBoard = []
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        let randomColor = colorGenerator(colors)
        let newSq = {
          corX: i,
          corY: j,
          color: `${randomColor}`,
        }
        newBoard.push(newSq)
      }
    }
    return dispatch(generateBoardSuccess(newBoard))
  }
}

export const checkNeighbours = (ev, board) => {
  return (dispatch, getState) => {
    const colors = getState().colors

    let clickedSquare = board[ev.target.dataset.value]
    let neighbours = []
    let goodNeighbours = []

    const checkGoodNeighbours = checkSq => {
      let down = board.filter(
        elm => elm.corX === checkSq.corX + 1 && elm.corY === checkSq.corY
      )
      let up = board.filter(
        elm => elm.corX === checkSq.corX - 1 && elm.corY === checkSq.corY
      )
      let left = board.filter(
        elm => elm.corX === checkSq.corX && elm.corY === checkSq.corY - 1
      )
      let right = board.filter(
        elm => elm.corX === checkSq.corX && elm.corY === checkSq.corY + 1
      )

      if (checkSq.corX === 0 && checkSq.corY === 0) {
        neighbours.push(right, down)
      } else if (checkSq.corX === 0 && checkSq.corY === 9) {
        neighbours.push(left, down)
      } else if (checkSq.corX === 4 && checkSq.corY === 0) {
        neighbours.push(right, up)
      } else if (checkSq.corX === 4 && checkSq.corY === 9) {
        neighbours.push(left, up)
      } else if (checkSq.corX === 0) {
        neighbours.push(right, down, left)
      } else if (checkSq.corX === 4) {
        neighbours.push(right, up, left)
      } else if (checkSq.corY === 0) {
        neighbours.push(up, down, right)
      } else if (checkSq.corY === 9) {
        neighbours.push(left, down, up)
      } else {
        neighbours.push(up, right, down, left)
      }

      goodNeighbours = neighbours.filter(elm => elm[0].color === checkSq.color)

      return goodNeighbours
    }

    checkGoodNeighbours(clickedSquare)

    let searchingSteps = 4
    while (searchingSteps > 0) {
      goodNeighbours.forEach(elm => {
        checkGoodNeighbours(elm[0])
      })
      searchingSteps -= 1
    }

    const toDelete = [...goodNeighbours]
      .map(elm => elm[0])
      .filter((val, ind, arr) => arr.indexOf(val) === ind)
      .sort((a, b) => a.corX - b.corX)
      .sort((a, b) => a.corY - b.corY)

    dispatch(checkNeighboursSuccess(toDelete, clickedSquare))

    const corYArr = []
    toDelete.forEach(elm => corYArr.push(elm.corY))

    let yCount = corYArr.reduce((obj, item) => {
      if (!obj[item]) {
        obj[item] = 0
      }
      obj[item]++
      return obj
    }, {})

    const toMove = []

    let lastY = -1
    toDelete.forEach(elm => {
      if (elm.corY > lastY) {
        for (let i = 0; i < elm.corX; i++) {
          let movingSq = board.filter(
            sq => sq.corX === i && sq.corY === elm.corY
          )
          toMove.push(...movingSq)
        }
        lastY = elm.corY
      }
    })

    dispatch(squaresToMove(toMove))

    const howFar = square => {
      const entries = Object.entries(yCount)
      for (let [y, count] of entries) {
        if (parseInt(y) === square.corY) {
          return count
        }
      }
    }

    const toEmpty = []
    const modifiedToMove = []

    toMove.forEach(elm => {
      let drop = howFar(elm)
      toEmpty.push(drop)
      let newCorX = elm.corX + drop
      modifiedToMove.push({
        corX: newCorX,
        corY: elm.corY,
        color: elm.color,
      })
    })

    board.map(elm =>
      modifiedToMove.forEach(el => {
        if (elm.corX === el.corX && elm.corY === el.corY) {
          elm.color = el.color
        }
      })
    )

    lastY = -1
    let newSquares = []
    toDelete.forEach(elm => {
      // debugger
      if (elm.corY > lastY) {
        for (let i = 0; i < yCount[elm.corY]; i++) {
          newSquares.push({
            corX: i,
            corY: elm.corY,
            color: '',
          })
        }
        lastY = elm.corY
      }
    })

    const regeneratingSquares = field => {
      field.forEach(elm => {
        let newColor = colorGenerator(colors)
        elm.color = newColor
      })
    }

    regeneratingSquares(newSquares)

    board.forEach(elm => {
      newSquares.forEach(el => {
        if (elm.corX === el.corX && elm.corY === el.corY) {
          elm.color = el.color
        }
      })
    })

    board.sort((a, b) => a.corY - b.corY).sort((a, b) => a.corX - b.corX)

    dispatch(squaresToRegenerate(newSquares))
  }
}
