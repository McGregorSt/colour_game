import React, { Component } from 'react'
import { connect } from 'react-redux'

import GameBoard from './GameBoard/GameBoard'
import classes from './GameField.css'
import PointsCounter from './PointsCounter/PointsCounter'

class GameField extends Component {
  render() {
    console.log(this.props.counter)
    return (
      <div className={classes.GameField}>
        <GameBoard />
        <PointsCounter counter={this.props.counter} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
  }
}

export default connect(mapStateToProps)(GameField)
