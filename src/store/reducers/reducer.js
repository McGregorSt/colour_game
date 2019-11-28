import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  board: [],
}

const generateBoard = (state, action) => {
  return updateObject(state, {
    board: action.board
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GENERATE_BOARD: return generateBoard(state, action)
    default: return state
  }
}

export default reducer