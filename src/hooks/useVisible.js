import { useCallback, useState } from 'react'

export default (initVisible = false) => {
  const [params, setParams] = useState()
  const [visible, setVisible] = useState(initVisible)

  const open = useCallback((params) => {
    setParams(params)
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    setParams(undefined)
  }, [])

  return {
    params,
    visible,
    open,
    close,
  }
}
