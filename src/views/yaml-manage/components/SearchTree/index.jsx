import React, { useState, useEffect } from 'react'
import {Input, message, Tree} from 'antd'
import cs from 'classnames'
import qs from 'qs-stringify'
import request from '@/request'
import { useVisible } from '@/hooks'
import { updateTreeData } from '@/utils'
import { MachineSelectModal } from '@/components'

import './index.less'

const { Search } = Input

export default (props) => {
  const { logRef, onSelect } = props
  const actionModal = useVisible()
  const [loading, setLoading] = useState(false)
  const [treeData, setTreeData] = useState([])
  const fetchTree = (path = '') => {
    setLoading(loading + 1)
    return request
      .get('/dev-ops/devops/file/list', { type: 1, path })
      .then(res => {
        const { success, data = [] } = res
        if (success) {
          return data.map(item => ({
            key: `${path}/${item.name}`,
            title: item.name,
            isLeaf: item.type === 1
          }))
        }
        return []
      })
      .finally(() => {
        setLoading(loading - 1)
      })
  }

  const fetchSearch = (name) => {
    setLoading(loading + 1)
    setTreeData([])
    return request
      .get('/dev-ops/devops/yaml/searchyaml', { name })
      .then(res => {
        const { success, data = [] } = res
        if (success) {
          return data.map(filePath => ({
            key: filePath,
            title: filePath,
            isLeaf: true
          }))
        }
        return []
      })
      .finally(() => {
        setLoading(loading - 1)
      })
  }

  const handleLoadData = async (treeNode) => {
    const { key, title, isLeaf } = treeNode.props.data
    return new Promise(resolve => {
      if (isLeaf) {
        resolve()
      }

      fetchTree(key).then(children => {
        setTreeData(origin => updateTreeData(origin, key, children))
        resolve()
      })
    })
  }

  const handleSearch = (searchKey) => {
    setTreeData([])
    if (searchKey) {
      fetchSearch(searchKey).then(treeData => {
        setTreeData(treeData)
      })
    } else {
      fetchTree(searchKey).then(treeData => {
        setTreeData(treeData)
      })
    }
  }

  const handleSelect = (selectedKeys, info) => {
    const { key, title, isLeaf } = info.node
    if (isLeaf) {
      onSelect(key)
    }
  }

  const handleSync = filePath => {
    actionModal.open({
      type: '同步',
      title: `同步文件路径：${filePath}`,
      url: '/dev-ops/devops/dog/sync',
      info: {
        filePath,
        type: 'yaml'
      }
    })
  }

  const handleReload = filePath => {
    actionModal.open({
      type: '更新',
      title: `更新文件路径：${filePath}`,
      url: '/dev-ops/devops/yaml/reloadyaml',
      info: {
        filePath
      },
    })
  }

  const handleOk = (ips = []) => {
    const { url, type, title, info = {} } = actionModal.params
    const log = {
      title,
      record: ips.map(ip => ({
        title: `${type} ip：${ip}`,
        status: 'success'
      }))
    }

    return request.post(url, qs({ ...info, ips: ips.join(',') }))
      .then(res => {
        message.success(`操作成功`)
        log.record.forEach(record => record.status = 'success')
        actionModal.close()
      })
      .catch(error => {
        log.record.forEach(record => {
          record.title = error.msg
          record.status = 'error'
        })
      })
      .finally(() => {
        logRef.current.addLog(log)
      })
  }

  useEffect(() => {
    fetchTree().then(treeData => {
      setTreeData(treeData)
    })
  }, [])

  const titleRender = (nodeData) => {
    const { key, title, isLeaf } = nodeData
    return (
      <div
        className={
          cs('title-render', { 'leaf': isLeaf })
        }
      >
        <div className="title-render__title">
          {title}
        </div>
        <div className="title-render__actions">
          <a
            onClick={event => {
              event.stopPropagation()
              handleSync(key)
            }}
          >
            同步
          </a>
          <a
            onClick={event => {
              event.stopPropagation()
              handleReload(key)
            }}
          >
            更新
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="search-tree">
      <div className="search-tree__header">
        <Search
          placeholder="请输入服务名查找yaml"
          allowClear
          onSearch={handleSearch}
        />
      </div>
      <div className="search-tree__content">
        {
          treeData.length > 0 && (
            <Tree
              showIcon
              showLine
              treeData={treeData}
              onSelect={handleSelect}
              loadData={handleLoadData}
              titleRender={titleRender}
            />
          )
        }
      </div>
      {
        actionModal.visible && (
          <MachineSelectModal
            params={actionModal.params}
            onCancel={actionModal.close}
            onOk={handleOk}
          />
        )
      }
    </div>
  )
}
