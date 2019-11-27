import React from 'react'

import GameBoard from './GameBoard/GameBoard'
import classes from './GameField.css'

const GameField = () => {
  return <div classes={classes.GameField}>
    <GameBoard />
  </div>
}
 
export default GameField