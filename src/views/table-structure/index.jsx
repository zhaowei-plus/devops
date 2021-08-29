import React, { useEffect } from 'react'
import { Table, Button,Modal, message } from 'antd'

import { useList, useVisible } from '@/hooks'
import { Layout, Search, Actions } from '@/components'
import request from '@/request'

import AddModal from './components/AddModal'
import { getSchema, getColumns } from './config'
const { Header, Content } = Layout

export default () => {
  const addModal = useVisible()
  const list = useList('/dev-ops/devops/db/sqlList', {}, { needSelectType: false })

  const handleAdd = () => {
    addModal.open()
  }

  const handleDelete = (record) => {
    Modal.confirm({
      centered: true,
      title: '确认删除吗?',
      content: '删除后不可恢复',
      onOk:() => request.post('/dev-ops/devops/db/delSql', {
        id: record.id,
      }).then(res => {
        message.success('删除成功')
        list.onRefresh()
      })
    })
  }

  const handleExecute = ({ id }) => {
    Modal.confirm({
      centered: true,
      title: '确认执行吗？',
      content: '是否确认执行改SQL？',
      onOk: () => {
        window.location.href = `/dev-ops/devops/db/executeSql?id=${id}`
        message.success('执行成功')
        list.onRefresh()
      }
    })
  }

  useEffect(() => {
    list.onSearch()
  }, [])

  const schema = getSchema()
  const columns = getColumns({
    handleDelete,
    handleExecute
  })
  return (
    <Layout loading={list.loading}>
      <Header title="订正|导出|表结构"/>
      <Content>
        <Search
          schema={schema}
          onSearch={list.onSearch}
        />
        <Actions>
          <Button
            type="primary"
            onClick={handleAdd}
          >
            添加
          </Button>
        </Actions>
        <Table
          columns={columns}
          {...list.table}
          scroll={{ x: 'max-content' }}
        />
        {
          addModal.visible && (
            <AddModal
              params={addModal.params}
              onCancel={addModal.close}
              onOk={() => {
                addModal.close()
                list.onRefresh()
              }}
            />
          )
        }
      </Content>
    </Layout>
  )
}
