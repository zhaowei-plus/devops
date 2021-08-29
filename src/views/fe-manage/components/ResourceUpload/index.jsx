import React, {useMemo, useState} from 'react'
import cs from 'classnames'
import qs from 'qs-stringify'
import { Space, Button, Upload, message, Checkbox } from 'antd'
import request from '@/request'
import { useVisible } from '@/hooks'
import { MachineSelectModal } from '@/components'

import './index.less'

export default (props) => {
  const { logRef } = props
  const syncModal = useVisible()
  const [packages, setPackages] = useState([])
  const [updateFiles, setUpdateFiles] = useState([])

  const handleSyncOk = (ips) => {
    const files = packages.map(item => updateFiles.find(file => file.value === item).label)
    const loadLogs = logRef.current.batchAddLogs(files.map(filePath => ({
      title: `资源地址：${filePath}`,
      record: ips.map(ip => ({
        title: `同步 ip：${ip}`,
        status: 'pending'
      }))
    })))
    return Promise.all(
      files.map((filePath, index) => {
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

  const handlePackageChange = (params) => {
    setPackages(params)
  }

  const handleCheckAllChange = (event) => {
    if (event.target.checked) {
      setPackages(updateFiles.map(file => file.value))
    } else {
      setPackages([])
    }
  }

  const uploadProps = {
    name: 'file',
    showUploadList: false,
    action: '/dev-ops/devops/resource/upload',
    onChange: ({ file, fileList }) => {
      const { status, response = {}, name, size} = file
      if (status === 'done' && response.success) {
        const fileRecord = {
          label: response.data,
          value: fileList.length,
        }
        setUpdateFiles(updateFiles.concat([fileRecord]))
      }
      if (status === 'error' || (status === 'done' && !response.success)) {
        message.error('资源包上传错误')
      }
    }
  }

  const checkAll = useMemo(() => {
    return updateFiles.length === packages.length
  }, [updateFiles, packages])

  return (
    <div className="resource-upload">
      <div className="resource-upload__header">
        <Space>
          <Upload
            {...uploadProps}
          >
            <Button type="primary">上传资源包</Button>
          </Upload>
          <Button
            type="primary"
            onClick={syncModal.open}
            disabled={packages.length === 0}
          >
            同步
          </Button>
        </Space>
      </div>
      <div className="resource-upload__content package">
        <div className="package__header">
          资源包列表
        </div>
        <div
          className={
            cs('package__content', {
              'hidden': updateFiles.length === 0
            })
          }
        >
          <div className="check-all">
            <Checkbox
              checked={checkAll}
              onChange={handleCheckAllChange}
            >
              全选
            </Checkbox>
          </div>
          <div className="check-list">
            <Checkbox.Group
              value={packages}
              options={updateFiles}
              onChange={handlePackageChange}
            />
          </div>
        </div>
      </div>
      {
        syncModal.visible && (
          <MachineSelectModal
            onOk={handleSyncOk}
            onCancel={syncModal.close}
          />
        )
      }
    </div>
  )
}
