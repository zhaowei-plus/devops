import React, { useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { routes, cacheRoutes } from '@/routes/config'
import Sider from './Sider'
import Header from './Header'
import CacheTabs from './CacheTabs'
import './index.less'

const Container = (props) => {
  const { history, location: { pathname } } = props
  const [active, setActive] = useState()
  const currentMenus = useMemo(() => {
    const activeMenu = cacheRoutes.find(x => x.path === active)
    if (activeMenu) {
      return activeMenu.routes
    }
    return []
  }, [active])

  const handleMenuChange = (key) => {
    setActive(key)
  }

  if (routes.map(route => route.path).includes(pathname)) {
    return props.children
  }

  return (
    <div className="xm-container">
      <Header
        active={active}
        history={history}
        pathname={pathname}
        menus={cacheRoutes.filter(cacheRoute => cacheRoute.visible !== false)}
        onChange={handleMenuChange}
      />
      <div className="xm-container__content">
        <Sider
          key={active}
          history={history}
          pathname={pathname}
          menus={currentMenus}
        />
        <div className="content">
          <CacheTabs
            history={history}
            pathname={pathname}
          />
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Container)
