import React, { useState, useEffect } from 'react'
import { Space, message, Menu, Dropdown, Modal } from 'antd'
import qs from 'qs-stringify'
import { CodeEditor, CodeDiffViewer } from '@/components'
import { useVisible } from '@/hooks'
import request from '@/request'

import './index.less'

export default (props) => {
  const { file, value: fileData, histories, onRefresh } = props
  const [value, setValue] = useState()
  const [editable, setEditable] = useState(false)

  const handleChange = (value) => {
    setValue(value)
  }

  const handleCancel = () => {
    setEditable(false)
  }

  const handleSave = () => {
    return request.post('/dev-ops/devops/configProxy/save', qs({
      content: value,
      name: file,
    })).then(res => {
      setEditable(false)
      message.success('保存成功')
      onRefresh()
    })
  }

  const handleEdit = () => {
    setEditable(true)
  }

  const handleReboot = (ips) => {
    return request.post('/dev-ops/devops/configProxy/reload').then(res => {
      message.success('重启成功')
      onRefresh()
    })
  }

  const handleSelectHistory = ({ key }) => {
    return request.get('/dev-ops/devops/configProxy/getHistory', { name: file, fileName: key }).then(res => {
      const { success, data } = res
      if (success) {
        Modal.info({
          title: '修改比较',
          width: 1000,
          content: (
            <div style={{ width: '100%', overflow: 'auto',  height: 600 }}>
              <CodeDiffViewer
                title={[key, '线上']}
                value={[data, fileData]}
              />
            </div>
          )
        })
      }
    })
  }

  const renderHistory = () => {
    const menuOverlay = (
      <Menu onClick={handleSelectHistory}>
        {
          histories.map(file =>
            <Menu.Item key={file}>{file}</Menu.Item>
          )
        }
      </Menu>
    )

    return (
      <Dropdown
        arrow
        trigger="click"
        placement="topRight"
        overlay={menuOverlay}
      >
        <a>历史记录</a>
      </Dropdown>
    )
  }

  useEffect(() => {
    setValue(fileData)
  }, [fileData])

  return (
    <div className="operation-pane">
      <div className="operation-pane__header">
        {
          editable ? (
            <Space>
              <a onClick={handleCancel}>取消</a>
              <a onClick={handleSave}>保存</a>
            </Space>
          ) : (
            <Space>
              <a onClick={handleEdit}>编辑</a>
              <a onClick={handleReboot}>重启</a>
            </Space>
          )
        }
        <div className="history">
          {renderHistory()}
        </div>
      </div>
      <div className="operation-pane__content">
        <CodeEditor
          value={fileData}
          options={{
            languages: ['bash']
          }}
          editable={editable}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
