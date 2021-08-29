import React, { useState, useEffect } from 'react'
import { Space, message, Menu, Dropdown, Modal } from 'antd'
import { CodeEditor, MachineSelectModal, CodeDiffViewer } from '@/components'
import { useVisible } from '@/hooks'
import qs from 'qs-stringify'
import request from '@/request'

import './index.less'

const options = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  cursorStyle: 'line',
  automaticLayout: false,
  theme: 'vs-dark',
  languages: ['javascript']
}

export default (props) => {
  const { file, value: fileData, histories, onRefresh } = props
  const [value, setValue] = useState()
  const [editable, setEditable] = useState(false)
  const machineSelectModal = useVisible()

  const handleChange = (value) => {
    setValue(value)
  }

  const handleCancel = () => {
    setEditable(false)
  }

  const handleSave = () => {
    return request.post('/dev-ops/devops/resource/write', qs({
      content: value,
      name: file,
      filePath: '/data/webapps/statics/config/admin/version.js'
    })).then(res => {
      setEditable(false)
      message.success('保存成功')
      onRefresh()
    })
  }

  const handleEdit = () => {
    setEditable(true)
  }

  const handleSyncOk = (ips) => {
    return request.post('/dev-ops/devops/resource/push', qs({ ips: ips.join(',') })).then(res => {
      message.success('同步成功')
      machineSelectModal.close()
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
              <a onClick={() => {
                machineSelectModal.open({
                  title: `同步文件${file}`
                })
              }}>同步</a>
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
            languages: ['javascript']
          }}
          editable={editable}
          onChange={handleChange}
        />
      </div>
      {
        machineSelectModal.visible && (
          <MachineSelectModal
            params={machineSelectModal.params}
            onCancel={machineSelectModal.close}
            onOk={handleSyncOk}
          />
        )
      }
    </div>
  )
}
