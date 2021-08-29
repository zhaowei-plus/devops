import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import TaskList from './task-list'
import PlanList from './plan-list'

export default (props) => {
  // match 只有匹配成功才有值
  const { path } = props.match || {}
  return (
    <Fragment>
      <Route
        exact
        path={path}
        component={TaskList}
      />
      <Route
        exact
        path={`${path}/plan-list/:taskId`}
        component={PlanList}
      />
    </Fragment>
  )
}
