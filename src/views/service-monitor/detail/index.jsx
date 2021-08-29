import React, { useEffect, useState } from 'react'
import { Layout } from '@/components'
import { useVisible } from "@/hooks";
import request from "@/request";

import ProcessTags from './components/ProcessTags'
import ProcessInfo from './components/ProcessInfo'

import './index.less'

const { Content } = Layout

export default props => {
  const { params = {}, onBack } = props
  const { proxy } = params
  const processInfo = useVisible()
  const [detail, setDetail] = useState({})
  const [processList, setProcessList] = useState([])
  const { process = {}, childrenProcesses = [], parentProcesses = [] } = detail

  const fetchProxy = (proxyName, processes = processList) => {
    setProcessList([...processes, proxyName])
    return request.get('/dev-ops/devops/dependency/getByProxy', { proxyName: proxyName.toLowerCase() }).then(res => {
      setDetail(res.data)
    })
  }

  const handleInfo = params => {
    processInfo.open(params)
  }

  const handleSelectProcess = (proxyName, index) => {
    setTimeout(() => {
      fetchProxy(proxyName, processList.slice(0, index))
    })
  }

  useEffect(() => {
    proxy && fetchProxy(proxy)
  }, [])

  return (
    <Layout>
      <Content wrapperClassName="service-monitor-detail">
        <div className="breadcrumb">
          <div className="breadcrumb__item" onClick={onBack}>
            返回
          </div>
          {
            processList.map((process, index) => (
              <div
                key={index}
                className="breadcrumb__item"
                onClick={() => handleSelectProcess(process, index)}
              >
                {process}
              </div>
            ))
          }
        </div>
        <ProcessTags
          key="parentProcesses"
          onInfo={handleInfo}
          processes={parentProcesses}
        />
        <ProcessTags
          key="process"
          onInfo={handleInfo}
          processes={[process]}
        />
        <ProcessTags
          key="childrenProcesses"
          onInfo={handleInfo}
          processes={childrenProcesses}
        />
        {
          processInfo.visible && (
            <ProcessInfo
              params={processInfo.params}
              onCancel={processInfo.close}
              onShowProcess={proxyName => {
                processInfo.close()
                fetchProxy(proxyName)
              }}
            />
          )
        }
      </Content>
    </Layout>
  )
}
