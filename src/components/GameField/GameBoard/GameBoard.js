import React, { Component } from 'react'
import { connect } from 'react-redux'

import ColorSq from './ColorSq/ColorSq'
import classes from './GameBoard.css'
import * as actions from '../../../store/actions/index'

class GameBoard extends Component {

  componentDidMount() {
    this.props.onGenerateBoard()
    // this.props.onCheckNeighbours(this.props.board)
  }
  
  // onClickHandler = (ev) => {
  //   let dataValue = ev.target.dataset.value
  //   let dataColor = ev.target.dataset.color
    
  //   return console.log(parseInt(dataValue), dataColor)
  // }

  render() {
    const board = this.props.board
    console.log('board', board)
    
    let renderBoard = this.props.board.map((sq, id) => {
      return <ColorSq 
        key={id} 
        x={sq.corX} 
        y={sq.corY} 
        color={sq.color} 
        value={id} 
        clicked={(ev) => this.props.onCheckNeighbours(ev, this.props.board)}/>
    })
    
    return (
      <div className={classes.GameBoard}>
        {renderBoard}
      </div>
    ) 
  }
}

const mapStateToProps = state => {
  return {
    board: state.board
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGenerateBoard: () => dispatch(actions.generateBoard()),
    onCheckNeighbours: (ev, board) => dispatch(actions.checkNeighbours(ev, board))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (GameBoard)