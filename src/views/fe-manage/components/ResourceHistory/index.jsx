import React, {useEffect, useState} from 'react'
import { Space, Button, Tree, message } from 'antd'
import qs from 'qs-stringify'

import { MachineSelectModal } from '@/components'
import request from '@/request'
import { useVisible } from '@/hooks'
import { updateTreeData } from '@/utils'
import './index.less'

export default (props) => {
  const { logRef } = props
  const syncModal = useVisible()
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

  const handleCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys)
  }

  const handleSyncOk = (ips) => {
    const loadLogs = logRef.current.batchAddLogs(checkedKeys.map(filePath => ({
      title: `资源地址：${filePath}`,
      record: ips.map(ip => ({
        title: `同步 ip：${ip}`,
        status: 'pending'
      }))
    })))
    return Promise.all(
      checkedKeys.map((filePath, index) => {
        const loadLog = loadLogs[index]
        return request.post('/dev-ops/devops/dog/sync', qs({
          type: 'resource',
          filePath,
          ips: ips.join(',')
        }))
          .then(res => {
            loadLog.record.forEach(record => record.status = 'success')
          })
          .catch(error => {
            loadLog.record.forEach(record => {
              record.title = error.msg
              record.status = 'error'
            })
          })
      })
    ).then(() => {
      message.success('同步成功')
      syncModal.close()
    }).finally(() => {
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
            onClick={syncModal.open}
          >
            同步
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
        {
          syncModal.visible && (
            <MachineSelectModal
              onCancel={syncModal.close}
              onOk={handleSyncOk}
            />
          )
        }
      </div>
    </div>
  )
}
