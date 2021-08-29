import React from 'react'
import './index.less'

export default (props) => {
  return (
    <div className="actions">
      {props.children}
    </div>
  )
}