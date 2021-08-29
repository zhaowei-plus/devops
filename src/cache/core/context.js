import React, { createContext, useContext, useEffect } from 'react'
import {isFunction} from "@/cache/utils";

export const CacheProviderContext = createContext()

export const CacheComponentContext = createContext()

const useCacheRoute = (lifeCycleName, effect) => {
  if (!isFunction(useContext)) {
    return
  }

  const cacheLifeCycles = useContext(CacheComponentContext)
  useEffect(() => {
    if (isFunction(cacheLifeCycles[lifeCycleName])) {
      const off = cacheLifeCycles[lifeCycleName](effect)
      return () => {
        off()
      }
    }
  }, [])
}

export const useDidCache = useCacheRoute.bind(null, 'didCache')
export const useDidRecover = useCacheRoute.bind(null, 'didRecover')
export const useCacheStore = () => useContext(CacheProviderContext)
