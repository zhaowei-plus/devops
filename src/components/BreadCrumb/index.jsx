import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'

export default withRouter(props => {
  const {
    routes = [],
    extra,
    history,
  } = props

  const handleClick = route => {
    const { to, onClick } = route
    if (to) {
      history.push(to)
    } else if (typeof onClick === 'function') {
      onClick()
    }
  }

  return (
    <div className="bread-crumb">
      <div className="bread-crumb__routes">
        {
          routes.map((route, i, array) => {
            const isString = typeof route === 'string'
            const title = isString ? route : route.title

            if (i === array.length - 1 || isString) {
              return (
                <div
                  key={i}
                  className="route">
                  <span>{title}</span>
                </div>
              )
            }
            return (
              <div
                key={i}
                className="route">
                <a onClick={() => handleClick(route)}>{title}</a>
              </div>
            )
          })
        }
      </div>
      {
        !!extra && (
          <div className="bread-crumb__extra">
            {extra}
          </div>
        )
      }
    </div>
  )
})
