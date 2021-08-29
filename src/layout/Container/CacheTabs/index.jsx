import React, { useMemo } from 'react'
import cs from 'classnames'
import { Tabs } from 'antd'
import { useCacheStore } from '@/cache'
import './index.less'

const CacheTabs = (props) => {
  const { history, pathname } = props
  const { cache, removeCache } = useCacheStore()

  const handleClick = (tab) => {
    history.push(tab)
  }

  const handleEdit = (tab) => {
    removeCache(tab)
  }

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

  const activeKey = useMemo(() => {
    const item = cache.find(item => paths.includes(item.path))
    if (item) {
      return item.path
    }
  }, [cache, paths])

  return (
    <div
      className={
        cs('cache-tabs', {
          'hidden': cache.length === 0
        })
      }
    >
      <Tabs
        hideAdd
        size="small"
        onEdit={handleEdit}
        activeKey={activeKey}
        onChange={handleClick}
        type={cache.length > 1 ? 'editable-card' : 'card'}
      >
        {
          cache.map((tab, index) => (
            <Tabs.TabPane key={tab.path} tab={tab.title} />
          ))
        }
      </Tabs>
    </div>
  )
}

export default CacheTabs
