import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  colors: ['8b1e3f', '3c153b', '89bd9e', 'f0c987', 'db4c40'],
  board: [],
  clicked: null,
  counter: 0,
  neighbours: [],
  toMove: [],
  toRegenerate: [],
}

const generateBoard = (state, action) => {
  return updateObject(state, {
    board: action.board,
  })
}
const checkNeighbours = (state, action) => {
  const updateCounter = state.counter + action.neighbours.length
  return updateObject(state, {
    neighbours: action.neighbours,
    clicked: action.clicked,
    counter: updateCounter,
  })
}
const squaresToMove = (state, action) => {
  return updateObject(state, {
    toMove: action.toMove,
  })
}
const squaresToRegenerate = (state, action) => {
  return updateObject(state, {
    toRegenerate: action.toRegenerate,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GENERATE_BOARD:
      return generateBoard(state, action)
    case actionTypes.CHECK_NEIGHBOURS:
      return checkNeighbours(state, action)
    case actionTypes.SQUARES_TO_MOVE:
      return squaresToMove(state, action)
    case actionTypes.SQUARES_TO_REGENERATE:
      return squaresToRegenerate(state, action)
    default:
      return state
  }
}

export default reducer
