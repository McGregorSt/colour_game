import React, { Component } from 'react'

import ColorSq from './ColorSq/ColorSq'
import classes from './GameBoard.css'

class GameBoard extends Component {

  // componentDidMount() {
  //   generateBoard()
  // }
  
  onClickHandler = (ev) => {
    let dataValue = ev.target.dataset.value
    let dataColor = ev.target.dataset.color
    
    return console.log(parseInt(dataValue), dataColor)
  }

  render() {
    let newBoard = []
  
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
  
    // console.log(colorGenerator(colors))
  
    const generateBoard = () => {
      for (let i = 0; i < 5; i ++) {
        for (let j = 0; j < 10; j++) {
          let randomColor = colorGenerator(colors)
          let newSq = {corX: i, corY: j, color: `${randomColor}`, id: `${i} ${j}`}
          newBoard.push(newSq)
        }
      }
      return newBoard
    }

    generateBoard()
    // console.log('genB', generateBoard())
  
    let renderBoard = newBoard.map((sq, id) => {
      // console.log(`${sq.corX} ${sq.corY} ${sq.color}`)
      return <ColorSq key={id} x={sq.corX} y={sq.corY} color={sq.color} value={id} clicked={this.onClickHandler}/>
    })
    
    return (
      <div className={classes.GameBoard}>
        {renderBoard}
      </div>
    ) 
  }
}
 
export default GameBoard