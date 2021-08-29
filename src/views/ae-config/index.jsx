import React, {useEffect, useState} from 'react'
import { Tabs } from 'antd'

import OperationPane from './components/OperationPane'
import { Layout } from '@/components'
import request from '@/request'

import { CONFIG_FILES } from './constant'

import './index.less'

const { Header, Content } = Layout

const { TabPane } = Tabs
const AEConfig = () => {
  const [file, setFile] = useState('variable')
  const [fileData, setFileData] = useState()
  const [histories, setHistories] = useState([])

  const fetchFileData = (name) => {
    request.get('/dev-ops/devops/configProxy/get', { name }).then(res => {
      setFileData(res.data)
    })
  }

  const fetchHistories = (name) => {
    request.get('/dev-ops/devops/configProxy/history', { name, fileName: history }).then(res => {
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
      <Header title="后端配置" />
      <Content wrapperClassName="ae-config">
        <div className="ae-config__header">
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
        <div className="ae-config__content">
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

export default AEConfig
