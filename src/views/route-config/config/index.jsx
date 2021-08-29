import React from 'react'
import { Space } from 'antd'
import { PLUGIN_TYPES } from '../constant'

export const getSchema = () => ({
  name: {
    type: 'string',
    title: 'name',
  },
  uriPattern: {
    type: 'string',
    title: 'UriPattern',
  },
  proxyPass: {
    type: 'string',
    title: 'ProxyPass',
  }
})

export const getAddSchema = () => ({
  name: {
    type: 'string',
    title: 'name',
    'x-props': {
      placeholder: 'input location name'
    }
  },
  uriPattern: {
    type: 'string',
    title: 'UriPattern',
    'x-props': {
      placeholder: '^~(Prefix), =(Exact), ~*(Regex)'
    }
  },
  proxyPass: {
    type: 'string',
    title: 'ProxyPass',
    description: '' +
      'e.g:\n' +
      'AACE         : aace://proxy.interface.${0}\n' +
      'HttpDirect   : http://host:port/xxx/ (Take notice the last \'/\')\n' +
      'HttpCenter   : http://xxx.center/xxx/ (Take notice the last \'/\')\n' +
      'ConfigCenter : cc://app/${0}\n' +
      'Redis        : redis://redisKey/db/${0}\n' +
      'Mysql        : mysql://dbKey/table',
    'x-props': {
      placeholder: '(aace|http(s))://[host][:port]/path/${[0-9]}[/]'
    }
  },
  plugins: {
    type: 'array',
    'x-component': 'ArrayPlugin',
    // default: [
    //   { name: 'trace-id', value: 'this is test data' },
    // ],
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          enum: PLUGIN_TYPES
        },
        value: {
          type: 'string',
        }
      }
    }
  },
})

export const getColumns = (actions) => {
  const {
    handleEdit,
    handleCopy,
    handleEnable,
    handleDisabled,
    handleDelete
  } = actions
  return [
    {
      title: '编号',
      dataIndex: 'id',
      render: (text, record, index) => index + 1
    },
    {
      title: 'name',
      dataIndex: 'name'
    },
    {
      title: 'UriPattern',
      dataIndex: 'uriPattern'
    },
    {
      title: 'ProxyPass',
      dataIndex: 'proxyPass'
    },
    {
      title: '操作',
      dataIndex: 'disabled',
      render: (value, record) => {
        return (
          <Space>
            <a onClick={() => handleEdit(record)}>编辑</a>
            <a onClick={() => handleCopy(record)}>复制</a>
            {
              value ? <a onClick={() => handleEnable(record)}>启用</a> : <a onClick={() => handleDisabled(record)}>禁用</a>
            }
            <a onClick={() => handleDelete(record)}>删除</a>
          </Space>
        )
      }
    }
  ]
}
