import React, { useMemo } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

const { Sider } = Layout
const { SubMenu } = Menu

const XmSider = (props) => {
  const { history, menus, pathname } = props

  // 选择的菜单项发生改变
  const paths = useMemo(
    () =>
      pathname
        .split('/')
        .filter(Boolean)
        .map(
          (item, index, arr) =>
            `/${arr.slice(0, index + 1).join('/')}`
        ),
    [pathname]
  )

  const handleClick = ({ key }) => {
    if (key !== pathname) {
      history.push(key)
    }
  }

  const renderMenus = (menus = []) => {
    return menus.filter(({ visible = true }) => visible).map(({ title, path, children = [] }) => {
      if (children.length > 0) {
        return (
          <SubMenu
            key={path}
            title={title}
          >
            {renderMenus(children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={path}>{title}</Menu.Item>
    })
  }

  const defaultOpenKeys = menus
    .filter(it => Array.isArray(it.children) && it.children.length > 0)
    .map(d => d.path)

  return (
    <Sider style={{ backgroundColor: '#fff' }} className="xm-sider">
      {
        menus.length > 0 && (
          <Menu
            mode="inline"
            selectedKeys={paths}
            onClick={handleClick}
            defaultOpenKeys={defaultOpenKeys}
          >
            {renderMenus(menus)}
          </Menu>
        )
      }
    </Sider>
  )
}

export default XmSider
