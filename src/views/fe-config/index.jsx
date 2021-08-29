import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import request from '@/request'
import { Layout } from '@/components'
import { CONFIG_FILES } from './constant'
import OperationPane from './components/OperationPane'

import './index.less'

const { Header, Content } = Layout
const { TabPane } = Tabs

const FeConfig = () => {
  const [file, setFile] = useState('version')
  const [fileData, setFileData] = useState()
  const [histories, setHistories] = useState([])

  const fetchFileData = (name) => {
    return request.get('/dev-ops/devops/resource/read', { name }).then(res => {
      setFileData(res.data)
    })
  }

  const fetchHistories = (name) => {
    return request.get('/dev-ops/devops/configProxy/history', { name }).then(res => {
      setHistories(res.data)
    })
  }

  const handleRefresh = () => {
    fetchFileData(file)
    fetchHistories(file)
  }

  const handleChangeFile = (file) => {
    setFile(file)
  }

  useEffect(() => {
    handleRefresh()
  }, [file])

  return (
    <Layout>
      <Header title="前端配置" />
      <Content wrapperClassName="fe-config">
        <div className="fe-config__header">
          <Tabs
            activeKey={file}
            onChange={handleChangeFile}
          >
            {
              CONFIG_FILES.map(config => (
                <TabPane
                  tab={config.label}
                  key={config.value}
                />
              ))
            }
          </Tabs>
        </div>
        <div className="fe-config__content">
          <OperationPane
            file={file}
            value={fileData}
            histories={histories}
            onRefresh={handleRefresh}
          />
        </div>
      </Content>
    </Layout>
  )
}

export default FeConfig
