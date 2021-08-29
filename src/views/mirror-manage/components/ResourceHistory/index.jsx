import React, {useEffect, useState} from 'react'
import { Space, Button, Tree, message } from 'antd'
import qs from 'qs-stringify'
import request from '@/request'
import { updateTreeData } from '@/utils'
import './index.less'

export default (props) => {
  const { logRef } = props
  const [loading, setLoading] = useState(0)
  const [treeData, setTreeData] = useState([])
  const [checkedKeys, setCheckedKeys] = useState([])

  const fetchTree = (path = '') => {
    return request.get('/dev-ops/devops/file/list', { type: 3, path })
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

  const handleLoadData = async (treeNode) => {
    const { key, isLeaf } = treeNode.props.data
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

  const handleCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys)
  }

  const handleLoadRepository = () => {
    const loadLogs = logRef.current.batchAddLogs(checkedKeys.map(filePath => ({
      title: `资源地址：${filePath}`,
      record: [
        {
          title: '重装镜像',
          status: 'pending'
        }
      ]
    })))
    return Promise.all(
      checkedKeys.map((filePath, index) => {
        const loadLog = loadLogs[index]
        return request.post('/dev-ops/devops/respo/dockerload', qs({
          filePath
        })).then(() => {
          loadLog.record = [
            {
              title: '重装镜像',
              status: 'success'
            }
          ]
          message.success('重装成功')
        }).catch((error) => {
          loadLog.record = [
            {
              title: error.msg,
              status: 'error'
            }
          ]
        })
      })
    ).finally(() => {
      logRef.current.batchUpdateLogs(loadLogs)
    })
  }

  const handleClearSelect = () => {
    setCheckedKeys([])
  }

  useEffect(() => {
    fetchTree().then(treeData => {
      setTreeData(treeData)
    })
  }, [])

  return (
    <div className="resource-history">
      <div className="resource-history__header">
        <Space>
          <Button
            type="primary"
            disabled={checkedKeys.length === 0}
            onClick={handleLoadRepository}
          >
            重装镜像
          </Button>
          <Button
            type="primary"
            disabled={checkedKeys.length === 0}
            onClick={handleClearSelect}
          >
            清空选中资源
          </Button>
        </Space>
      </div>
      <div className="resource-history__content">
        {
          treeData.length > 0 && (
            <Tree
              showIcon
              showLine
              checkable
              treeData={treeData}
              onCheck={handleCheck}
              loadData={handleLoadData}
              checkedKeys={checkedKeys}
            />
          )
        }
      </div>
    </div>
  )
}
