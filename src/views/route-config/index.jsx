import React, { useEffect } from 'react'
import { Table, message, Button, Modal } from 'antd'
import { Layout, Search } from '@/components'
import { useList, useVisible } from '@/hooks'
import request from '@/request'
import { getSchema, getColumns } from './config'
import AddModal from './components/AddModal'

const { Header, Content } = Layout

const RouteConfig = () => {
  const addModal = useVisible()
  const list = useList('/awg-admin/api/location/search')

  const setStatus = (id, status) => {
    const statusTextMap = {
      1: '禁用',
      0: '启用'
    }
    return request.get('/awg-admin/api/location/changeStatus', { id, status }).then(res => {
      message.success(`${statusTextMap[status]}成功`)
      list.onRefresh()
    })
  }

  const handleAdd = () => {
    addModal.open({
      type: 'add',
      title: '新增路由'
    })
  }
  const handleDelete = ({ id }) => {
    Modal.confirm({
      title: '删除后不可恢复，确定删除数据？',
      content: '',
      onOk: () => {
        request.get('/awg-admin/api/location/delete', { id }).then(res => {
          message.success('删除成功')
          list.onRefresh()
        })
      },
    })
  }

  const handleEdit = (record) => {
    addModal.open({
      type: 'edit',
      title: '编辑路由',
      record
    })
  }

  const handleCopy = ({ id }) => {
    return request.post('/awg-admin/api/location/copy', { id }).then(res => {
      message.success('拷贝成功')
      list.onRefresh()
    })
  }

  const handleEnable = ({ id }) => {
    setStatus(id, 0)
  }
  const handleDisabled = ({ id }) => {
    setStatus(id, 1)
  }

  useEffect(() => {
    list.onRefresh()
  }, [])

  const schema = getSchema()
  const columns = getColumns({
    handleEdit,
    handleCopy,
    handleEnable,
    handleDisabled,
    handleDelete
  })
  return (
    <Layout>
      <Header title="路由配置"
        extra={(
          <Button
            type="primary"
            onClick={handleAdd}
          >
            新增路由
          </Button>
        )} />
      <Content wrapperClassName="route-config">
        <Search
          schema={schema}
          onSearch={list.onSearch}
        />
        <Table
          columns={columns}
          {...list.table}
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

export default RouteConfig
