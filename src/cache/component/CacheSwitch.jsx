import React from 'react'
import { Switch, matchPath, withRouter } from 'react-router-dom'
import { CacheProviderContext } from '../core/context'
import Updatable from './Updatable'

// 处理 Switch 嵌套问题
class CacheSwitch extends Switch {
  render () {
    const { children, location, level = 1 } = this.props
    return (
      <CacheProviderContext.Consumer>
        {
          context => React.Children.map(children, element => {
            if (React.isValidElement(element)) {
              const path = element.props.path || element.props.form
              const match = matchPath(location.pathname, {
                ...element.props,
                path
              })

              const cached = context.isCache(path)
              if (!match && !cached) {
                return null
              }
              return (
                <Updatable when={!!match} key={path}>
                  {
                    React.cloneElement(element, {
                      location,
                      computedMatch: match,
                      matched: !!match,
                      cached
                    })
                  }
                </Updatable>
              )
            }
          })
        }
      </CacheProviderContext.Consumer>
    )
  }
}

CacheSwitch = withRouter(CacheSwitch)

CacheSwitch.displayName = 'CacheSwitch'

export default CacheSwitch
