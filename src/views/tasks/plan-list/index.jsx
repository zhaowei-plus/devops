import React, { useEffect } from 'react'
import { Table, Button } from 'antd'
import { useList, useVisible } from '@/hooks'
import { Layout, BreadCrumb } from '@/components'
import { getColumns } from './config'
import AddModal from './components/AddModal'

import './index.less'

const { Header, Content } = Layout

const PlanList = (props) => {
  const { history, match: { params: { taskId } } } = props
  const addModal = useVisible()
  const list = useList('/dev-ops/monitor/planList', { }, { taskId })

  useEffect(() => {
    list.onSearch()
  }, [])

  const handleAdd = () => {
    addModal.open({
      title: '新增计划',
      type: 'add',
      record: {
        taskId,
      }
    })
  }

  const handleEdit = (record) => {
    addModal.open({
      title: '编辑计划',
      type: 'edit',
      record: {
        ...record,
        taskId
      }
    })
  }

  const handleDetail = (record) => {
    addModal.open({
      title: '计划详情',
      type: 'detail',
      record: {
        ...record,
        taskId
      }
    })
  }

  const columns = getColumns({
    handleEdit,
    handleDetail
  })
  return (
    <Layout loading={list.loading}>
      <a
        className="back h32 lh32 pl8"
        onClick={() => history.goBack()}
      >
        返回
      </a>
      <Header
        title="计划列表"
        extra={(
          <Button
            type="primary"
            onClick={handleAdd}
          >
            新增计划
          </Button>
        )}
      />
      <Content wrapperClassName="plan-list">
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

export default PlanList
