import React, { Component } from 'react'
import { Spin, PageHeader } from 'antd'
import cs from 'classnames'

import './index.less'

/**
 * 公用布局组件
 */
class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError (error) {
    // 更新 state 使下一次渲染能够显示降级后的ui
    return {
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo) {
    // 可以将日志错误上报给服务器
    this.setState({
      hasError: true,
      error,
      errorInfo
    })
  }

  render () {
    const { loading = false, children } = this.props
    const { hasError, error, errorInfo } = this.state

    if (hasError) {
      return (
        <div className="page-layout error">
          { error.toString() }
          { errorInfo.componentStack }
        </div>
      )
    }

    return (
      <Spin spinning={loading} wrapperClassName="page-layout">
        {children}
      </Spin>
    )
  }
}

const Header = props => {
  const { wrapperClassName = '', ...rest } = props
  return <PageHeader {...rest} className={`page-header ${wrapperClassName}`} />
}

const Content = props => {
  const {
    children,
    wrapperClassName = '',
    ...rest
  } = props
  return (
    <div className={`page-content ${wrapperClassName}`} {...rest}>
      {children}
    </div>
  )
}

const Footer = props => {
  const {
    hidden,
    children,
    wrapperClassName = '',
    ...rest
  } = props
  return (
    <div
      className={cs(`page-footer ${wrapperClassName}`, { hidden: hidden })}
      {...rest}
    >
      {children}
    </div>
  )
}

Layout.Header = Header
Layout.Content = Content
Layout.Footer = Footer

export default Layout
