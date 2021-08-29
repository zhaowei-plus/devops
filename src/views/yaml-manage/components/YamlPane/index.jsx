import React, { useEffect, useState, useCallback, Fragment } from 'react'
import {Menu, Dropdown, Space, message, Modal} from 'antd'
import yaml from 'js-yaml'
import request from '@/request'
import { CodeEditor, CodeDiffViewer } from '@/components'
import './index.less'

export default props => {
  const { filePath } = props
  const [value, setValue] = useState()
  const [fileData, setFileData] = useState()
  const [histories, setHistories] = useState([])
  const [editable, setEditable] = useState(false)

  const fetchFileData = (filePath) => {
    request.get('/dev-ops/devops/yaml/readyaml', { filePath }).then(res => {
      const { success, data = '{}' } = res
      if (success) {
        const formatData = yaml.dump(JSON.parse(data))
        setValue(formatData)
        setFileData(formatData)
      }
    })
  }

  const fetchHistories = (name) => {
    request.get('/dev-ops/devops/yaml/history', { name, fileName: filePath }).then(res => {
      setHistories(res.data || [])
    })
  }

  const fetchHistory = (name, fileName) => {
    request.get('/dev-ops/devops/yaml/getHistory', { name, fileName }).then(res => {
      const { success, data } = res
      if (success) {
        if (success) {
          Modal.info({
            title: '修改比较',
            width: 1100,
            content: (
              <div style={{ width: '100%', overflow: 'auto',  height: 600 }}>
                <CodeDiffViewer
                  title={[fileName, '线上']}
                  value={[data, fileData]}
                />
              </div>
            )
          })
        }
      }
    })
  }

  const handleChange = (info) => {
    setValue(info)
  }

  const handleEdit = () => {
    setEditable(true)
  }

  const handleCancel = () => {
    setValue(fileData)
    setEditable(false)
  }

  const handleSave = () => {
    request.post(`/dev-ops/devops/yaml/writeyaml`, `content=${value}&filePath=${filePath}`).then(res => {
      const { success } = res
      if (success) {
        setEditable(false)
        message.success('保存成功')
        fetchFileData(filePath)
        fetchHistories(filePath)
      }
    })
  }

  const handleChangeHistory = ({ key }) => {
    // 查询历史版本数据，线上对比
    fetchHistory(filePath, key)
  }

  useEffect(() => {
    if (filePath) {
      fetchFileData(filePath)
      fetchHistories(filePath)
    }
  }, [filePath])

  const renderHistoriesOverlay = useCallback(() => {
    return (
      <Menu onClick={handleChangeHistory}>
        {
          histories.map(history => (
            <Menu.Item key={history}>{history}</Menu.Item>
          ))
        }
      </Menu>
    )
  }, [histories])

  return (
    <div className="yaml-pane">
      {
        filePath && (
          <Fragment>
            <div className="yaml-pane__header">
              <label className="title">
                {filePath}
              </label>
              <div className="extra">
                <div className="operations">
                  {
                    editable ? (
                      <Space>
                        <a onClick={handleCancel}>取消</a>
                        <a onClick={handleSave}>保存</a>
                      </Space>
                    ) : (
                      <a onClick={handleEdit}>编辑</a>
                    )
                  }
                </div>
                <Dropdown overlay={renderHistoriesOverlay()}>
                  <a>历史记录</a>
                </Dropdown>
              </div>
            </div>
            <div className="yaml-pane__content">
              <div className="editor">
                <CodeEditor
                  value={fileData}
                  editable={editable}
                  onChange={handleChange}
                  options={{
                    languages: ['yaml']
                  }}
                />
              </div>
            </div>
          </Fragment>
        )
      }
    </div>
  )
}
