import React, { useEffect } from 'react'
import { Table, Button } from 'antd'
import { useList, useVisible } from '@/hooks'
import { Layout } from '@/components'
import { getColumns } from './config'
import AddModal from './components/AddModal'

const { Header, Content } = Layout

export default () => {
  const addModal = useVisible()
  const list = useList('/dev-ops/monitor/alarmList')

  const handleAdd = () => {
    addModal.open({
      title: '添加报警规则',
      type: 'add'
    })
  }

  const handleEdit = (record) => {
    addModal.open({
      title: '编辑报警规则',
      type: 'edit',
      record
    })
  }

  const handleDetail = (record) => {
    addModal.open({
      title: '报警规则详情',
      type: 'detail',
      record
    })
  }

  const handleOk = () => {
    addModal.close()
    list.onRefresh()
  }

  useEffect(() => {
    list.onSearch()
  }, [])

  const columns = getColumns({
    handleEdit,
    handleDetail
  })
  return (
    <Layout loading={list.loading}>
      <Header
        title="报警规则"
        extra={(
          <Button
            type="primary"
            onClick={handleAdd}
          >
            添加报警规则
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
            onOk={handleOk}
          />
        )
      }
    </Layout>
  )
}
