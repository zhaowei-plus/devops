import React, { useEffect } from 'react'
import { Table } from 'antd'
import moment from 'moment'
import { useList } from '@/hooks'
import { Layout, Search } from '@/components'
import { getSchema, getColumns } from './config'

const { Header, Content } = Layout

const RecordList = () => {
  const list = useList('/dev-ops/devops/db/sqlList')

  const handleSearch = (params = {}) => {
    const { executeStart, executeEnd, ...rest } = params
    if (executeStart && executeEnd) {
      rest.executeStart = moment(executeStart).startOf('day').valueOf()
      rest.executeEnd = moment(executeEnd).startOf('day').valueOf()
    }
    list.onSearch(rest)
  }

  useEffect(() => {
    list.onSearch()
  }, [])

  const schema = getSchema()
  const columns = getColumns()
  return (
    <Layout loading={list.loading}>
      <Header title="操作记录列表"/>
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

export default RecordList
