import React, { useState, useRef, useEffect } from 'react'
import { Tabs } from 'antd'
import { Layout, OperationLog } from '@/components'
import { CONFIG_TYPES } from './constant'
import ResourceUpload from './components/ResourceUpload'
import ResourceHistory from './components/ResourceHistory'

import './index.less'

const { Header, Content } = Layout
const { TabPane } = Tabs

const MirrorManage = () => {
  const logRef = useRef()
  const [tab, setTab] = useState(CONFIG_TYPES[0].value.toString())

  const handleTabChange = (key) => {
    setTab(key)
    logRef.current.clearLogs()
  }

  return (
    <Layout>
      <Header title="镜像管理"/>
      <Content wrapperClassName="mirror-manage">
        <div className="mirror-manage__header">
          <Tabs
            activeKey={tab}
            onChange={handleTabChange}
          >
            {
              CONFIG_TYPES.map(tab => (
                <TabPane key={tab.value} tab={tab.label} />
              ))
            }
          </Tabs>
        </div>
        <div className="mirror-manage__content">
          <div className="manage-pane">
            { Number(tab) === CONFIG_TYPES[0].value && (<ResourceUpload logRef={logRef}/>) }
            { Number(tab) === CONFIG_TYPES[1].value && (<ResourceHistory logRef={logRef}/>) }
          </div>
          <div className="log-pane">
            <OperationLog
              ref={logRef}
            />
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default MirrorManage
