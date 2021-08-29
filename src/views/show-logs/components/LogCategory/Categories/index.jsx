import React, { useState, useEffect } from 'react'
import { Breadcrumb, Spin } from 'antd'
import cs from 'classnames'
import {
  LoadingOutlined,
  CloudDownloadOutlined,
  RightOutlined,
  SnippetsOutlined
} from '@ant-design/icons'
import qs from 'qs-stringify'
import { useList } from '@/hooks'

import './index.less'

export default (props) => {
  const { ip, path = '/', catelog, searchKey, onSelect } = props
  const [file, setFile] = useState('')
  const [category, setCategory] = useState()
  const [dataSource, setDataSource] = useState([])
  const list = useList('/dev-ops/devops/logfind/list', { path: '', name: searchKey }, { ip, catelog, pageSize: 20 }, false)

  const handleLoadMore = (event) => {
    const { current, ...rest } = list.table.pagination
    event.stopPropagation()
    list.table.onChange({ current: current + 1, ...rest }).then(res => {
      if (res.total > dataSource.length) {
        setDataSource(dataSource.concat(res.dataSource))
      }
    })
  }

  const handleChangePath = (path) => {
    setCategory(path)
  }

  const handleDownLoad = (params) => {
    window.location.href = `/dev-ops/devops/logfind/downloadLog?${qs({
      ip,
      path,
      catelog
    })}`
  }

  const handleExpand = ({ name }) => {
    setCategory(name)
  }

  const handleSelect = ({ type, name }) => {
    if (type === 1) {
      setFile(name)
      if (category) {
        onSelect(`${category}/${name}`)
      } else {
        onSelect(name)
      }
    }
  }

  useEffect(() => {
    if (ip) {
      if (category) {
        list.onSearch({
          catelog,
          name: searchKey,
          path: `/${category}`
        }).then(res => {
          setDataSource(res.dataSource)
        })
      } else {
        list.onSearch({
          catelog,
          name: searchKey
        }).then(res => {
          setDataSource(res.dataSource)
        })
      }
    }
  }, [ip, catelog, searchKey, category])

  return (
    <Spin spinning={list.loading}>
      <div className="categories">
        {
          category && (
            <div className="categories__header">
              <Breadcrumb>
                <Breadcrumb.Item onClick={() => handleChangePath()}>
                  <a>根目录</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {category}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          )
        }
        <div className="categories__content list">
          {
            dataSource.map((category, index) => (
              <div
                key={index}
                className={
                  cs('category', {
                    'active': category.name === file
                  })
                }
                onClick={() => handleSelect(category)}
              >
                {
                  category.type === 0 && (
                    <div
                      className="category__icon"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleExpand(category)
                      }}
                    >
                      <RightOutlined />
                    </div>
                  )
                }
                {
                  category.type === 1 && (
                    <div className="category__icon">
                      <SnippetsOutlined />
                    </div>
                  )
                }
                <div className="category__info">
                  {category.name}
                </div>
                {
                  category.type === 1 && (
                    <div
                      className="category__operation"
                      onClick={event => {
                        event.stopPropagation()
                        handleDownLoad(category)
                      }}
                    >
                      <CloudDownloadOutlined />
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
        {
          dataSource.length > 0 && (
            <div className="categories__footer">
              <div className="load-more" onClick={handleLoadMore}>
                <span>加载更多</span>
                {
                  list.loading && (
                    <LoadingOutlined />
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </Spin>
  )
}
