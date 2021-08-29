const register = {
  cache: []
}

export const registerCache = (key, props) => {
  if (register.cache.findIndex(route => route.key === key) === -1) {
    register.cache.push({
      key,
      ...props
    })
  }
}

export const isCache = (key) => {
  return register.cache.findIndex(route => route.key === key) > -1
}

export const getCache = () => register