import React, {useMemo, useState} from 'react'
import cs from 'classnames'
import qs from 'qs-stringify'
import { Space, Button, Upload, message, Checkbox } from 'antd'
import request from "@/request";

import './index.less'

export default (props) => {
  const { logRef } = props
  const [packages, setPackages] = useState([])
  const [updateFiles, setUpdateFiles] = useState([])

  const handlePackageChange = (params) => {
    setPackages(params)
  }

  const handleLoadRepository = () => {
    const files = packages.map(item => updateFiles.find(file => file.value === item).label)
    const loadLogs = logRef.current.batchAddLogs(files.map(filePath => ({
      title: `资源地址：${filePath}`,
      record: [
        {
          title: '重装镜像',
          status: 'pending'
        }
      ]
    })))
    return Promise.all(
      files.map((filePath, index) => {
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
        }).catch((error) => {
          loadLog.record = [
            {
              title: error.msg,
              status: 'error'
            }
          ]
        })
      })
    ).then(() => {
      message.success('重装镜像成功')
    }).finally(() => {
      logRef.current.batchUpdateLogs(loadLogs)
    })
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
    action: '/dev-ops/devops/respo/upload',
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
            <Button type="primary">上传镜像</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleLoadRepository}
            disabled={packages.length === 0}
          >
            重装镜像
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
    </div>
  )
}
