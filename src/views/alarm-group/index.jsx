import React, { useEffect } from 'react'
import { Table, Button } from 'antd'
import { useList, useVisible } from '@/hooks'
import { Layout } from '@/components'
import { getColumns } from './config'
import AddModal from './components/AddModal'

const { Header, Content } = Layout

const AlarmGroup = () => {
  const addModal = useVisible()
  const list = useList('/dev-ops/monitor/alarmGroupList')

  useEffect(() => {
    list.onSearch()
  }, [])

  const handleAdd = () => {
    addModal.open({
      title: '新增报警接收分组',
      type: 'add',
    })
  }

  const handleEdit = ({ id }) => {
    addModal.open({
      title: '编辑报警接收分组',
      type: 'edit',
      id,
    })
  }

  const handleDetail = ({ id }) => {
    addModal.open({
      title: '报警接收分组详情',
      type: 'detail',
      id,
    })
  }

  const columns = getColumns({
    handleEdit,
    handleDetail
  })
  return (
    <Layout loading={list.loading}>
      <Header
        title="报警接收分组"
        extra={(
          <Button
            type="primary"
            onClick={handleAdd}
          >
            新增报警接收分组
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
              addModal.close()
              list.onRefresh()
            }}
          />
        )
      }
    </Layout>
  )
}

export default AlarmGroup
