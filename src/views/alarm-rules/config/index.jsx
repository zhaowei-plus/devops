import React from 'react'
import { Space } from 'antd'

export const getAddSchema = () => {
  return {
    name: {
      required: true,
      type: 'string',
      title: '任务名称',
    },
    method: {
      required: true,
      type: 'string',
      title: '执行方法',
    },
    description: {
      type: 'textarea',
      title: '任务描述',
    }
  }
}

export const getColumns = (actions) => {
  const {
    handleEdit,
    handleDetail
  } = actions
  return [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '执行方法',
      dataIndex: 'method',
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: 140,
      render: (text, record) => {
        return (
          <Space>
            <a onClick={() => handleEdit(record)}>编辑</a>
            <a onClick={() => handleDetail(record)}>详情</a>
          </Space>
        )
      }
    }
  ]
}
