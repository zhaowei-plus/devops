import React, { useState, useCallback } from 'react'
import { Table, message } from 'antd'
import debounce from 'lodash/debounce'
import { useSchemaProps } from '@formily/antd'
import request from '@/request'

const DBTable = () => {
  const [columns, setColumns] = useState([])
  const [dataSource, setDataSource] = useState([])
  const { form } = useSchemaProps()

  const fetchDBInfo = useCallback(debounce((params) => {
    return request.post('/dev-ops/devops/db/selectSql', params).then(res => {
      const { success, data = [] } = res
      if (success) {
        message.success('运行成功')
        const [columns, ...dataSource] = data
        setColumns(columns.map(column => ({
          title: column,
          dataIndex: column
        })))
        setDataSource(dataSource.map(item => {
          return item.reduce((buff, d, i) => {
            return {
              ...buff,
              [columns[i]]: d
            }
          }, {})
        }))
      }
    })
  }, 500), [])

  form.subscribe(({ type, payload }) => {
    if (type === 'execute') {
      fetchDBInfo(payload)
    }
  })

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

DBTable.isFiedldComponent = true

export default DBTable
