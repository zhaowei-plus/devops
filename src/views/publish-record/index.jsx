import React, { useEffect } from 'react'
import { Table } from 'antd'
import moment from 'moment'
import { useList } from '@/hooks'
import { Layout, Search } from '@/components'
import { getSchema, getColumns } from './config'

const { Header, Content } = Layout

const PublishRecord =  () => {
  const list = useList('/dev-ops/devops/log/query')

  const handleSearch = (params) => {
    const { startDate, endDate, ...rest } = params
    if (startDate && endDate) {
      rest.startDate = moment(startDate).startOf('ss').valueOf()
      rest.endDate = moment(endDate).endOf('ss').valueOf()
    }
    list.onSearch(rest)
  }

  useEffect(() => {
    list.onRefresh()
  }, [])

  const schema = getSchema()
  const columns = getColumns()
  return (
    <Layout loading={list.loading}>
      <Header title="发布记录" />
      <Content>
        <Search
          schema={schema}
          onSearch={handleSearch}
        />
        <Table
          columns={columns}
          {...list.table}
          scroll={{ x: 'max-content' }}
        />
      </Content>
    </Layout>
  )
}

export default PublishRecord
