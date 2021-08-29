import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import request from '@/request'
import { Layout } from '@/components'
import { getColumns } from './config'

import './index.less'

const { Header, Content } = Layout

const WatchDog =  () => {
  const [dataSource, setDataSource] = useState([])

  const fetchWatchdogs = () => {
    return request.get('/dev-ops/devops/monitor/dogs').then(res => {
      setDataSource(res.data.map((item, id) => ({ ...item, id })))
    })
  }

  useEffect(() => {
    fetchWatchdogs()
  }, [])

  const columns = getColumns()
  return (
    <Layout>
      <Header title="看门狗"/>
      <Content wrapperClassName="watch-dog">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
        />
      </Content>
    </Layout>
  )
}

export default WatchDog
