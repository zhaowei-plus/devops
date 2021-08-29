import React from 'react'
import { Route } from 'react-router-dom'
import { CacheSwitch, CacheRoute } from '@/cache'

import List from './list'
import Detail from './detail'

const ServiceMonitor = (props) => {
  // const { match: { path } } = props
  return (
    <List />
  )
  // return (
  //   <CacheSwitch>
  //     <CacheRoute exact path={path} component={List} />
  //     <Route exact path={`${path}/detail/:id`} component={Detail} />
  //   </CacheSwitch>
  // )
}

export default ServiceMonitor
