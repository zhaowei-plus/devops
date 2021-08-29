import React, { useState } from 'react'
import { Input } from 'antd'
import Categories from './Categories'
import './index.less'

export default (props) => {
  const { ip, path, catelog, onSelect } = props
  const [searchKey, setSearchKey] = useState()

  const handleSearch = (params) => {
    setSearchKey(params)
  }

  return (
    <div className="log-category">
      <div className="log-category__header">
        <Input.Search
          allowClear
          onSearch={handleSearch}
          placeholder="只支持当前目录下搜索"
        />
      </div>
      <div className="log-category__content">
        <Categories
          ip={ip}
          path={path}
          catelog={catelog}
          onSelect={onSelect}
          searchKey={searchKey}
        />
      </div>
    </div>
  )
}
