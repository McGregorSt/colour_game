import React from 'react'

import classes from './PointsCounter.css'
 
const PointsCounter = ({ counter }) => {
  return <div className={classes.PointsCounter} counter={counter}>
    <div className={classes.EmptyDiv}></div>    
    <div className={classes.Points}>
      Your score: <strong> {counter} </strong> 
    </div>
  </div>
}
 
export default PointsCounter