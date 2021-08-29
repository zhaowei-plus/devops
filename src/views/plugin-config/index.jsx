import React, { useEffect } from 'react'
import { Table, message, Button, Modal } from 'antd'
import { Layout, Search } from '@/components'
import { useList, useVisible } from '@/hooks'
import request from '@/request'
import { getSchema, getColumns } from './config'
import AddModal from './components/AddModal'

const { Header, Content } = Layout

const PluginConfig = () => {
  const list = useList('/awg-admin/api/plugin/search')
  const addModal = useVisible()

  const setStatus = (id, status) => {
    const statusTextMap = {
      1: '禁用',
      0: '启用'
    }
    return request.get('/awg-admin/api/plugin/changeStatus', { id, status }).then(res => {
      message.success(`${statusTextMap[status]}成功`)
      list.onRefresh()
    })
  }

  const handleAdd = () => {
    addModal.open({
      type: 'add',
      title: '新增插件'
    })
  }

  const handleEdit = (record) => {
    addModal.open({
      type: 'edit',
      title: '编辑插件',
      record
    })
  }

  const handleDelete = ({ id }) => {
    Modal.confirm({
      title: '删除后不可恢复，确定删除数据？',
      content: '',
      onOk: () => {
        request.get('/awg-admin/api/plugin/delete', { id }).then(res => {
          message.success('删除成功')
          list.onRefresh()
        })
      },
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
    handleDelete,
    handleEnable,
    handleDisabled
  })

  return (
    <Layout>
      <Header title="插件配置"
        extra={(
          <Button
            type="primary"
            onClick={handleAdd}
          >
            新增插件
          </Button>
        )} />
      <Content wrapperClassName="plugin-config">
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

export default PluginConfig
