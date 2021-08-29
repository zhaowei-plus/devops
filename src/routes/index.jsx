import React, { lazy, useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { CacheSwitch, CacheRoute } from '@/cache'
import request from '@/request'
import { routes, cacheRoutes } from './config'

// 1、为了更好的维护和迭代项目，需要针对项目中已有的问题（如UI交互、接口联调、流程控制）进行排查并重构

// 2、使用Vitejs对项目进行打包，优化本地开发体验，整体感觉不错，迁移过程中倒是没有踩坑

// 3、为实现项目子模块的keep-alive功能，参考 react-router-cache-router 封装基于路由层面的页面缓存，
// 并结合 Context 实现 EasyUI 的 页面tabs的切换，暴露对缓存页面的缓存和路由命中的钩子 hook，实现页面缓存和命中的执行回调

// 4、提取和封装公共组件，如后台框架、页面布局、搜索组件、代码编辑器（monaco editor），操作日志等，规范项目结构和编码规范，提高开发和维护效率

export default () => {
  const [menus, setMenus] = useState([])

  const fetchMenus = () => {
    return request.get('/dev-ops/power/menuList').then(res => {
      setMenus(res.data)
    })
  }

  const defaultRoute = routes.concat(cacheRoutes.reduce((buff, cacheRoute) => {
    return buff.concat(cacheRoute.routes)
  }, [])).find(route => route.isDefault)


  useEffect(() => {
    fetchMenus()
  }, [])

  const registerRoutes = (routes = [], cache = true) => {
    return routes.filter(({ visible = true }) => visible).map(route => {
      const { path, title, children = [], component } = route
      if (children.length > 0) {
        return registerRoutes(children)
      }

      if (cache) {
        return (
          <CacheRoute
            key={path}
            path={path}
            title={title}
            component={component}
          />
        )
      }

      return (
        <Route
          exact
          key={path}
          path={path}
          title={title}
          component={component}
        />
      )
    })
  }

  return (
    <CacheSwitch>
      {registerRoutes(routes)}
      {
        cacheRoutes.filter(cacheRoute => cacheRoute.visible !== false).map(cacheRoute => {
          return registerRoutes(cacheRoute.routes)
        })
      }
      {
        cacheRoutes.map(cacheRoute => (
          <Route
            exact
            key={cacheRoute.path}
            path={cacheRoute.path}
            component={() => <Redirect to={cacheRoute.routes[0].path} />}
          />
        ))
      }
      <Route key="404" component={() => <Redirect to="/404" />} />
      {
        defaultRoute && (
          <Route
            exact
            key="/"
            path="/"
            component={() => <Redirect to={defaultRoute.path} />}
          />
        )
      }
    </CacheSwitch>
  )
}
