import React from 'react'
import { Space } from 'antd'

export const getSchema = () => ({
  PluginName: {
    type: 'string',
    title: 'PluginName',
  },
  PluginId: {
    type: 'string',
    title: 'PluginId',
  },
})

export const getAddSchema = () => ({
  pluginName: {
    type: 'string',
    title: 'PluginName',
    'x-props': {
      placeholder: ''
    }
  },
  pluginId: {
    type: 'string',
    title: 'PluginId',
    'x-props': {
      placeholder: ''
    }
  },
  pluginVersion: {
    type: 'string',
    title: 'PluginVersion',
    'x-props': {
      placeholder: ''
    }
  },
  pluginUri: {
    type: 'string',
    title: 'PluginUri',
    'x-props': {
      placeholder: ''
    }
  },
  pluginConf: {
    type: 'textarea',
    title: 'PluginConf',
    'x-props': {
      placeholder: '',
      style: {
        height: '160px'
      }
    }
  },
})

export const getColumns = (actions) => {
  const {
    handleEdit,
    handleDelete,
    handleEnable,
    handleDisabled
  } = actions
  return [
    {
      title: '编号',
      dataIndex: 'id',
      render: (text, record, index) => index + 1
    },
    {
      title: 'PluginName',
      dataIndex: 'pluginName'
    },
    {
      title: 'PluginId',
      dataIndex: 'pluginId'
    },
    {
      title: 'PluginVersion',
      dataIndex: 'pluginVersion'
    },
    {
      title: '操作',
      dataIndex: 'enabled',
      render: (value, record) => {
        return (
          <Space>
            <a onClick={() => handleEdit(record)}>编辑</a>
            {
              value ? <a onClick={() => handleDisabled(record)}>禁用</a> : <a onClick={() => handleEnable(record)}>启用</a>
            }

            <a onClick={() => handleDelete(record)}>删除</a>
          </Space>
        )
      }
    }
  ]
}
