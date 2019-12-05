import React from 'react'

import classes from './ColorSq.css'

const ColorSq = ({ x, y, color, value, clicked }) => {
  return (
    <div
      className={classes.ColorSq}
      x={x}
      y={y}
      style={{ background: `${color}` }}
      onClick={clicked}
      data-value={value}
      data-color={color}
    >
    </div>
  )
}

export default ColorSq
