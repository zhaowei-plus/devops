import React, { useMemo } from 'react'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Cookies from 'js-cookie'
import { NavLink } from 'react-router-dom'
import { useCacheStore } from '@/cache'
import request from '@/request'
import './index.less'

const Header = (props) => {
  const { menus, history, pathname, onChange } = props
  const { clearCache } = useCacheStore()
  const { loginName } = useMemo(() => {
    const name = Cookies.get('b_name')
    if (name) {
      return {
        loginName: decodeURIComponent(escape(window.atob(name))),
        loginUid: Cookies.get('b_name'),
        loginMobile: Cookies.get('b_mobile')
      }
    }
    return {}
  }, [])

  const paths = useMemo(
    () =>
      pathname
        .split('/')
        .filter(Boolean)
        .map(
          (item, index, arr) =>
            `/${arr.slice(0, index + 1).join('/')}`,
        ),
    [pathname],
  )

  const activeMenu = useMemo(() => {
    const active = menus.find(cacheRoute => paths.includes(cacheRoute.path))
    if (active) {
      setTimeout(() => {
        onChange(active.path)
      })
      return active.path
    }
    return ''
  }, [paths, menus])

  const handleClick = ({ key }) => {
    if (key === 'logout') {
      request.post('/baas-login/login/logout').then(res => {
        Cookies.remove('myself')
        history.push('/logout')
      })
    }
  }

  const handleMenuSelect = ({ key }) => {
    onChange(key)
    clearCache()
  }

  const renderUserOverlay = () => {
    return (
      <Menu onClick={handleClick}>
        <Menu.Item key="logout">
          <a>退出</a>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div className="xm-header">
      <div className="xm-header__project">
        <i className="icon icon-devops" />
        <span className="title">DevOps</span>
      </div>
      <div className="xm-header__icon" />
      <div className="xm-header__menus">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeMenu]}
          onSelect={handleMenuSelect}
        >
          {
            menus.map(menu => (
              <Menu.Item key={menu.path}>
                <NavLink to={menu.path}>
                  {menu.title}
                </NavLink>
              </Menu.Item>
            ))
          }
        </Menu>
      </div>

      <Dropdown
        overlay={renderUserOverlay()}
        trigger={["click"]}
      >
        <div className="xm-header__user">
          <div className="info">
            {loginName}
          </div>
          <div className="icon">
            <DownOutlined />
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

export default Header
