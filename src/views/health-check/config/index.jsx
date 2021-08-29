import React from 'react'
import { Space } from 'antd'
import { matchProperty } from '@/utils'
import { APP_TYPES } from '../constant'

export const getAddSchema = () => ({
  app: {
    required: true,
    type: 'string',
    title: 'app',
  },
  url: {
    required: true,
    type: 'string',
    title: 'url',
  },
  path: {
    required: true,
    type: 'string',
    title: 'path',
  },
  method: {
    required: true,
    type: 'string',
    title: '请求方式',
    enum: ['GET', 'POST']
  },
  header: {
    type: 'textarea',
    title: '请求header',
    maxItems: 3,
    'x-component': 'ArrayTable',
    'x-component-props': {
      renderMoveDown: () => null,
      renderMoveUp: () => null,
    },
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: '名称',
          'x-props': {
            style: {
              minWidth: '140px'
            }
          }
        },
        value: {
          type: 'string',
          title: '参数值',
          'x-props': {
            style: {
              minWidth: '140px'
            }
          }
        }
      }
    }
  },
  param: {
    type: 'array',
    title: '请求参数',
    maxItems: 3,
    'x-component': 'ArrayTable',
    'x-component-props': {
      renderMoveDown: () => null,
      renderMoveUp: () => null,
    },
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: '名称',
          'x-props': {
            style: {
              minWidth: '140px'
            }
          }
        },
        value: {
          type: 'string',
          title: '参数值',
          'x-props': {
            style: {
              minWidth: '140px'
            }
          }
        }
      }
    }
  },
  type: {
    required: true,
    type: 'string',
    title: 'type',
    enum: APP_TYPES
  }
})

export const getColumns = (actions) => {
  const { handleEdit, handleDelete } = actions
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '应用名',
      dataIndex: 'app',
    },
    {
      title: '请求地址',
      dataIndex: 'url',
    },
    {
      title: '路径',
      dataIndex: 'path'
    },
    {
      title: '请求方式',
      dataIndex: 'method'
    },
    {
      title: '请求header',
      dataIndex: 'header'
    },
    {
      title: '请求参数',
      dataIndex: 'param'
    },
    {
      title: '请求应用来源',
      dataIndex: 'type',
      render: text => matchProperty(text, APP_TYPES)
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => (
        <Space>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDelete(record)}>删除</a>
        </Space>
      )
    }
  ]
}
