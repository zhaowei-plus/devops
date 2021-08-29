import React from 'react'
import { Space } from 'antd'
import { matchProperty } from '@/utils'
import { TASK_TYPES } from '../constant'

export const getAddSchema = () => {
  return {
    taskName: {
      required: true,
      type: 'string',
      title: '任务名'
    },
    quartz: {
      required: true,
      type: 'string',
      title: '时间表达式',
      description: 'cron格式'
    },
    type: {
      required: true,
      type: 'string',
      title: '类型',
      enum: TASK_TYPES
    },
    onOff: {
      required: true,
      type: 'boolean',
      title: '开关',
      'x-props': {
        checkedChildren: '开',
        unCheckedChildren: '关'
      }
    },
    job: {
      required: true,
      type: 'textarea',
      title: 'job',
    },
    metric: {
      required: true,
      type: 'textarea',
      title: 'metric'
    },
    description: {
      type: 'textarea',
      title: '描述'
    }
  }
}

export const getColumns = (actions) => {
  const {
    handlePlan,
    handleEdit,
    handleDetail
  } = actions
  return [
    {
      title: '任务名',
      dataIndex: 'taskName',
    },
    {
      title: '时间表达式',
      dataIndex: 'quartz',
    },
    {
      title: '任务描述',
      dataIndex: 'description',
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      render: text => matchProperty(text, TASK_TYPES)
    },
    {
      title: 'job',
      dataIndex: 'job'
    },
    {
      title: 'metric',
      dataIndex: 'metric',
    },
    {
      title: '开关',
      dataIndex: 'onOff',
      render: text => {
        if (text) {
          return '开'
        }
        return '关'
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => {
        return (
          <Space>
            <a onClick={() => handlePlan(record)}>计划列表</a>
            <a onClick={() => handleEdit(record)}>编辑</a>
            <a onClick={() => handleDetail(record)}>详情</a>
          </Space>
        )
      }
    }
  ]
}
