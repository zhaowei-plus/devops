import React from 'react'
import { Space } from 'antd'
import { matchProperty } from '@/utils'
import { CHECK_METHODS } from '../constant'

export const getAddSchema = () => {
  return {
    name: {
      required: true,
      type: 'string',
      title: '名称'
    },
    promql: {
      required: true,
      type: 'textarea',
      title: '查询语句'
    },
    preId: {
      required: true,
      type: 'string',
      title: '上级任务ID',
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
    checkMethod: {
      required: true,
      type: 'textarea',
      title: '处理结果方法',
      enum: CHECK_METHODS,
    },
    alarmGroupList: {
      required: true,
      type: 'string',
      title: '报警分组ID'
    },
    context: {
      required: true,
      type: 'textarea',
      title: '报警推送消息'
    },
    recoverContext: {
      required: true,
      type: 'textarea',
      title: '服务恢复推送消息'
    },
    exceptionNum: {
      required: true,
      type: 'number',
      title: '计算规则'
    },
    description: {
      type: 'textarea',
      title: '计划描述'
    },
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
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '查询语句',
      dataIndex: 'promql',
      width: 120,
    },
    {
      title: '上级任务ID',
      dataIndex: 'preId',
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
      title: '处理结果方法',
      dataIndex: 'checkMethod',
      render: text => matchProperty(text, CHECK_METHODS)
    },
    {
      title: '报警分组ID',
      dataIndex: 'alarmGroupList',
    },
    {
      title: '报警推送消息',
      dataIndex: 'context',
      width: 180,
    },
    {
      title: '服务恢复推送消息',
      dataIndex: 'recoverContext',
      width: 180,
    },
    {
      title: '计算规则',
      dataIndex: 'exceptionNum',
    },
    {
      title: '操作',
      dataIndex: 'id',
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
