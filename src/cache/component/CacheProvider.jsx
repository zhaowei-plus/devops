import React, { useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { CacheProviderContext } from '../core/context'

const CacheProvider = (props) => {
  const { history, location: { pathname } } = props
  const [cache, setCache] = useState([])

  const registerCache = useCallback((key, props) => {
    if (cache.findIndex(d => d.key === key) === -1) {
      setCache(cache.concat([
        {
          key,
          ...props
        }
      ]))
    }
  }, [cache])

  const setCacheProps = useCallback((key, props) => {
    const backupCache = JSON.parse(JSON.stringify(cache))
    const targetIndex = cache.findIndex(d => d.key === key)
    if (targetIndex > -1) {
      backupCache.splice(targetIndex, 1, {
        key,
        ...backupCache[targetIndex],
        ...props
      })
      setCache(backupCache)
    }
  }, [cache])

  const removeCache = useCallback((key) => {
    const index = cache.findIndex(route => route.key === key)
    const newCache = cache.filter(d => d.key !== key)
    setCache(newCache)

    if (key === pathname) {
      if (newCache.length === 0) {
        history.replace('/')
        return
      }

      if (index === 0) {
        history.replace(newCache[0].path)
        return
      }
      history.replace(newCache[index - 1].path)
    }
  }, [cache])

  const clearCache = useCallback(() => {
    setCache([])
  }, [])

  const isCache = useCallback((key) => {
    return cache.findIndex(route => route.key === key) > -1
  }, [cache])

  return (
    <CacheProviderContext.Provider
      value={{
        cache,
        isCache,
        registerCache,
        removeCache,
        clearCache,
        setCacheProps
      }}
    >
      {props.children}
    </CacheProviderContext.Provider>
  )
}

CacheProvider.displayName = 'CacheProvider'

export default withRouter(CacheProvider)
