import React, { Component } from 'react'
import { isFunction } from '../utils'

class Updatable extends Component {
  render () {
    if (isFunction(this.props.children)) {
      return this.props.children()
    }
    return this.props.children
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.when || nextProps.when
  }
}

export default Updatable