import React, { Component, createRef } from 'react'
import { CacheComponentContext } from '../core/context'

class CacheComponent extends Component {
  constructor(props) {
    super(props)
    const { path } = props
    this.wrapper = createRef()
    this.cacheLifeCycles = {
      listener: {},
      on: (eventName, listener) => {
        this.cacheLifeCycles.listener[eventName] = listener
        return () => {
          delete this.cacheLifeCycles.listener[eventName]
        }
      },
      didCache: listener => {
        this.cacheLifeCycles.listener['didCache'] = listener
      },
      didRecover: listener => {
        this.cacheLifeCycles.listener['didRecover'] = listener
      },
      notify: (eventType) => {
        if (this.cacheLifeCycles.listener[eventType]) {
          this.cacheLifeCycles.listener[eventType]()
        }
      }
    }

    this.placeholderNode = document.createComment(
      `Route cached ${path}`
    )
    this.state = {
      cached: false,
      matched: false,
      key: Date.now()
    }
  }

  componentDidMount() {
    const { matched, path, registerCache } = this.props
    if (matched) {
      registerCache(path, this.props)
    }
  }

  // static getDerivedStateFromProps (nextProps, prevState) {
  //   return {
  //     matched: nextProps.matched,
  //     cached: nextProps.cached
  //   }
  // }

  shouldComponentUpdate (nextProps, nextState) {
    const willRecover = this.props.matched === false && nextProps.matched === true
    const willDrop = this.props.matched === true && nextProps.matched === false
    // 当路由匹配时或缓存状态变化时，更新组件
    const shouldUpdate = this.props.matched || nextProps.matched || this.state.cached !== nextState.cached
    if (shouldUpdate) {
      if (willRecover) {
        // 挂载 dom
        this.injectDOM()
      }

      if (willDrop) {
        // 缓存 dom
        this.ejectDOM()
      }
    }
    return true
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!prevProps.cached || !this.state.cached) {
      return
    }

    if (prevState.matched === true && this.state.matched === false) {
      // DidCache
      if (this.props.unmount) {
        this.ejectDOM()
      }
      this.cacheLifeCycles.notify('didCache')
    }

    if (prevState.matched === false && this.state.matched === true) {
      // DidRecover
      if (this.props.unmount) {
        this.injectDOM()
      }
      this.cacheLifeCycles.notify('didRecover')
    }
  }

  componentWillUnmount() {
    this.placeholderNode.remove()
  }

  render () {
    const { cached } = this.state
    const { children } = this.props

    if (cached) {
      return null
    }

    return (
      <div
        ref={wrapper => {
          this.wrapper = wrapper
        }}
        style={this.computedStyle()}
      >
        <CacheComponentContext.Provider
          value={this.cacheLifeCycles}
        >
          {children(this.cacheLifeCycles)}
        </CacheComponentContext.Provider>
      </div>
    )
  }

  injectDOM = () => {
    if (this.parentNode) {
      this.parentNode.insertBefore(this.wrapper, this.placeholderNode)
    }
    this.cacheLifeCycles.notify('didRecover')
  }

  ejectDOM = () => {
    if (this.parentNode) {
      this.parentNode = this.wrapper.parentNode
      this.parentNode.insertBefore(this.placeholderNode, this.wrapper)
    }
    this.cacheLifeCycles.notify('didCache')
  }

  computedStyle = () => {
    const { matched } = this.props
    if (matched) {
      return {
        width: '100%',
        height: '100%',
        display: 'block',
        overflow: 'inherit'
      }
    }
    return {
      display: 'none',
      overflow: 'inherit'
    }
  }
}

export default CacheComponent
