import React, { useEffect } from 'react'
import { Table, Button, Modal, message } from 'antd'
import request from '@/request'
import { Layout } from '@/components'
import { useList, useVisible } from '@/hooks'
import { getColumns } from './config'
import AddModal from './components/AddModal'

const { Header, Content } = Layout

const HealthCheck = () => {
  const addModal = useVisible()
  const list = useList('/dev-ops/interface/checkList')

  const handleAdd = () => {
    addModal.open({
      type: 'add',
      title: '新增监控接口'
    })
  }

  const handleEdit = (record) => {
    addModal.open({
      type: 'edit',
      title: '编辑监控接口',
      record
    })
  }

  const handleDelete = ({ id }) => {
    Modal.confirm({
      centered: true,
      title: '提示',
      content: '确定删除吗？',
      onOk: () => request.post('/dev-ops/interface/deleteCheck', { id }).then(() => {
        message.success('删除成功')
        list.onRefresh()
      })
    })
  }

  useEffect(() => {
    list.onSearch()
  }, [])

  const columns = getColumns({ handleEdit, handleDelete })
  return (
    <Layout loading={list.loading}>
      <Header
        title="健康检查"
        extra={(
          <Button
            type="primary"
            onClick={handleAdd}
          >
            新增监控接口
          </Button>
        )}
      />
      <Content>
        <Table
          columns={columns}
          {...list.table}
          scroll={{ x: 'max-content' }}
        />
      </Content>
      {
        addModal.visible && (
          <AddModal
            params={addModal.params}
            onCancel={addModal.close}
            onOk={() => {
              addModal.close(
                list.onRefresh()
              )
            }}
          />
        )
      }
    </Layout>
  )
}

export default HealthCheck
