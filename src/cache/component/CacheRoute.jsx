import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { CacheProviderContext } from '../core/context'
import Updatable from './Updatable'
import CacheComponent from './CacheComponent'

class CacheRoute extends Component {
  render () {
    const {
      children,
      render,
      component,
      ...restProps
    } = this.props

    return (
      <CacheProviderContext.Consumer>
        {
          cacheProps => (
            <Updatable when={restProps.matched}>
              <Route {...restProps}>
                {
                  routeProps => {
                    return (
                      <CacheComponent
                        {...restProps}
                        {...cacheProps}
                        {...routeProps}
                      >
                        {
                          props => {
                            if (component) {
                              return React.createElement(component, {
                                ...props,
                                ...routeProps
                              })
                            }

                            if (render) {
                              return render(props)
                            }

                            if (children) {
                              return React.Children.map(children)
                            }
                          }
                        }
                      </CacheComponent>
                    )
                  }
                }
              </Route>
            </Updatable>
          )
        }
      </CacheProviderContext.Consumer>
    )
  }
}

CacheRoute.displayName = 'CacheRoute'

export default CacheRoute
