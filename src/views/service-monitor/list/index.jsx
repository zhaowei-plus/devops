import React, {useEffect, useState} from 'react'
import { Table, Button } from 'antd'
import cs from 'classnames'

import request from '@/request'
import { Layout } from '@/components'
import { useVisible } from '@/hooks'

import Detail from '../detail'
import { getColumns } from './config'

import './index.less'

const { Header, Content } = Layout

export default () => {
  const process = useVisible()
  const [dataSource, setDataSource] = useState([])

  const fetchProxy = () => {
    return request.get('/dev-ops/devops/monitor/allProxy').then(res => {
      setDataSource(res.data.map((item, id) => {
        if (item.servers && item.servers.length > 0) {
          return {
            ...item.servers[0],
            id,
          }
        }
        return {
          id
        }
      }))
    })
  }

  const handleDetail = (record) => {
    process.open(record)
  }

  useEffect(() => {
    fetchProxy()
  }, [])

  const columns = getColumns(handleDetail)
  return (
    <Layout>
      <Header
        title="服务监控"
        extra={(
          <Button
            type="link"
            target="_blank"
            className="link"
            href="/service-graph"
          >
            服务依赖全景图
          </Button>
        )}
      />
      <Content
        wrapperClassName={
          cs('service-monitor-list', {
            hidden: process.visible
          })
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          pagination={false}
          dataSource={dataSource}
        />
      </Content>
      {
        process.visible && (
          <Detail
            params={process.params}
            onBack={process.close}
          />
        )
      }
    </Layout>
  )
}
