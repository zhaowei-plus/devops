import React, { useEffect } from 'react'
import { Table, Button } from 'antd'
import { useList, useVisible } from '@/hooks'
import { Layout } from '@/components'
import { getColumns } from './config'
import AddModal from './components/AddModal'

const { Header, Content } = Layout

const TaskList = (props) => {
  const { history, match: { path } } = props
  const addModal = useVisible()
  const list = useList('/dev-ops/monitor/taskList')

  useEffect(() => {
    list.onSearch()
  }, [])

  const handleAdd = () => {
    addModal.open({
      title: '新增任务',
      type: 'add'
    })
  }

  const handlePlan = ({ id }) => {
    history.push(`${path}/plan-list/${id}`)
  }

  const handleEdit = (record) => {
    addModal.open({
      title: '编辑任务',
      type: 'edit',
      record
    })
  }

  const handleDetail = (record) => {
    addModal.open({
      title: '任务详情',
      type: 'detail',
      record
    })
  }

  const columns = getColumns({
    handlePlan,
    handleEdit,
    handleDetail
  })
  return (
    <Layout loading={list.loading}>
      <Header
        title="任务列表"
        extra={(
          <Button
            type="primary"
            onClick={handleAdd}
          >
            新增任务
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

export default TaskList
