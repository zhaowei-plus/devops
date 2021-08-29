import React, { useState, useRef } from 'react'
import { Layout, OperationLog } from '@/components'
// import { useDidRecover, useDidCache } from '@/cache'
import YamlPane from './components/YamlPane'
import SearchTree from './components/SearchTree'
import './index.less'

const { Header, Content } = Layout

const YamlManage = () => {
  const logRef = useRef()
  const [filePath, steFilePath] = useState()

  return (
    <Layout>
      <Header title="Yaml管理" />
      <Content wrapperClassName="yaml-manage">
        <div className="yaml-manage__left">
          <SearchTree
            logRef={logRef}
            onSelect={steFilePath}
          />
        </div>
        <div className="yaml-manage__right yaml flex-column">
          <div className="yaml__editor">
            <YamlPane
              key={filePath}
              logRef={logRef}
              filePath={filePath}
            />
          </div>
          <div className="yaml__log f1">
            <OperationLog
              ref={logRef}
            />
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default YamlManage
