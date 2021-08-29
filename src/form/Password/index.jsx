import React from 'react'
import { Input } from 'antd'

export default props => {
  const { value = '', onChange, placeholder, disabled = false, ...rest } = props
  const handleChange = e => {
    onChange(e.target.value)
  }

  // 文本态
  if (disabled) {
    return (<span>********</span>)
  }

  // 编辑态
  return (
    <Input.Password
      value={value}
      onChange={handleChange}
      visibilityToggle={false}
      placeholder={placeholder}
      {...rest}
    />
  )
}
