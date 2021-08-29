import React, {useState, useEffect} from 'react'
import { Select } from 'antd'
import { Layout } from '@/components'
import request from "@/request";
import LogInfo from './components/LogInfo'
import LogCategory from './components/LogCategory'
import { LOG_TYPES } from './constant'

const { Header, Content } = Layout

import './index.less'

const ShowLogs = () => {
  const [ip, setIp] = useState()
  const [path, setPath] = useState()
  const [dogOptions, setDogOptions] = useState([])
  const [catelog, setCatelog] = useState(LOG_TYPES[0].value)

  const fetchDogs = () => {
    return request.get('/dev-ops/devops/monitor/dogs').then(res => {
      setDogOptions(res.data.map(item => {
        return {
          label: item.name,
          value: item.ip
        }
      }))
    })
  }

  const handleIPChange = (ip) => {
    setIp(ip)
  }

  const handleCatelog = (catelog) => {
    setCatelog(catelog)
  }

  useEffect(() => {
    fetchDogs()
  }, [])

  return (
    <Layout>
      <Header title="远程查看" />
      <Content wrapperClassName="show-logs">
        <div className="show-logs__header">
          <span className="title">
            选择主机：
          </span>
          <div className="control">
            <Select
              value={ip}
              style={{ width: 220 }}
              options={dogOptions}
              placeholder="请选择"
              onChange={handleIPChange}
            />
          </div>
          <span className="title">
            选择类型：
          </span>
          <div className="control">
            <Select
              value={catelog}
              style={{ width: 220 }}
              options={LOG_TYPES}
              placeholder="请选择"
              onChange={handleCatelog}
            />
          </div>
        </div>
        <div className="show-logs__content">
          <LogCategory
            key={ip}
            ip={ip}
            path={path}
            catelog={catelog}
            onSelect={setPath}
          />
          <LogInfo
            ip={ip}
            key={path}
            path={path}
            catelog={catelog}
          />
        </div>
      </Content>
    </Layout>
  )
}

export default ShowLogs
