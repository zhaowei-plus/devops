import React, { useState, forwardRef, useImperativeHandle } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import './index.less'

const OperationLog = forwardRef((props, ref) => {
  const [logList, setLogList] = useState([])

  const batchAddLogs = (logs = []) => {
    const batchLogs = logs.map((log, i) => ({
      ...cloneDeep(log),
      id: Math.random().toString(36).substr(2) + Date.now() + i
    }))
    setLogList(logList.concat(batchLogs))
    return batchLogs
  }

  const batchUpdateLogs = (logs = []) => {
    const backupLogs = cloneDeep(logList)
    logs.forEach(log => {
      const index = logs.findIndex(item => item.id === log.id)
      if (index > -1) {
        backupLogs.splice(index, 1, log)
      }
    })
    setLogList(backupLogs)
  }

  const addLog = (log) => {
    // 创建
    const logInfo = {
      ...cloneDeep(log),
      id: Math.random().toString(36).substr(2) + Date.now()
    }
    setLogList(logList.concat([logInfo]))
    return logInfo
  }

  const updateLog = (log) => {
    const index = logList.findIndex(item => item.id === log.id)
    if (index > -1) {
      const backupLogs = cloneDeep(logs)
      backupLogs.splice(index, 1, { ...log, id })
      setLogList(backupLogs)
    }
  }

  const clearLogs = () => {
    setLogList([])
  }

  useImperativeHandle(ref, () => {
    return {
      addLog,
      updateLog,
      clearLogs,
      batchAddLogs,
      batchUpdateLogs
    }
  })

  return (
    <div className="operation-log">
      <div className="operation-log__header">
        日志
      </div>
      <div className="operation-log__content">
        {
          logList.map(log => (
            <div className="log" key={log.id}>
              <div className="log__header">
                {log.title}
              </div>
              <div className="log__content">
                {
                  log.record.map((record, index) => (
                    <div className="record" key={index}>
                      <div className="record__title">
                        {record.title}
                      </div>
                      {
                        record.status === 'success' && (
                          <div className="record__status success">
                            <CheckCircleOutlined />
                            成功
                          </div>
                        )
                      }
                      {
                        record.status === 'error' && (
                          <div className="record__status error">
                            <CloseCircleOutlined />
                            失败
                          </div>
                        )
                      }
                      {
                        record.status === 'pending' && (
                          <div className="record__status pending">
                            <LoadingOutlined />
                            处理中
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
})

export default OperationLog