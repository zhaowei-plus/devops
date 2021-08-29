import React, { useState, useRef } from 'react'
import { Tabs } from 'antd'
import { Layout, OperationLog } from '@/components'
import { CONFIG_TYPES } from './constant'
import ResourceUpload from './components/ResourceUpload'
import ResourceHistory from './components/ResourceHistory'

import './index.less'

const { Header, Content } = Layout
const { TabPane } = Tabs

const FeManage = () => {
  const logRef = useRef()
  const [tab, setTab] = useState(CONFIG_TYPES[0].value.toString())

  const handleTabChange = (key) => {
    setTab(key)
  }

  return (
    <Layout>
      <Header title="前端资源管理" />
      <Content wrapperClassName="fe-manage">
        <div className="fe-manage__header">
          <Tabs
            activeKey={tab}
            onChange={handleTabChange}
          >
            {
              CONFIG_TYPES.map(tab => (
                <TabPane tab={tab.label} key={tab.value} />
              ))
            }
          </Tabs>
        </div>
        <div className="fe-manage__content">
          <div className="manage-pane">
            { Number(tab) === CONFIG_TYPES[0].value && (<ResourceUpload logRef={logRef}/>) }
            { Number(tab) === CONFIG_TYPES[1].value && (<ResourceHistory logRef={logRef}/>) }
          </div>
          <div className="log-pane">
            <OperationLog ref={logRef} />
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default FeManage
