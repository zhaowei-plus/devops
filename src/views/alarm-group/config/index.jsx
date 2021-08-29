import React from 'react'
import { Space } from 'antd'

export const getAddSchema = () => {
  return {
    name: {
      required: true,
      type: 'string',
      title: '计划名'
    },
    mobileList: {
      required: true,
      type: 'textarea',
      title: '手机号列表',
      description: '逗号分隔的手机号列表'
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
      title: '名称',
      dataIndex: 'name',
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
