import React, {Fragment} from 'react'
import { matchProperty, formatDate } from '@/utils'
import { TASK_TYPES, EXECUTE_STATUS } from '@/assets/constant'

// 2、抽离封装统一的页面布局、列表搜索、按钮组等公共组件，
// 封装用于统一列表请求和弹窗等公共 Hook，如useList，useVisible、useFetch等，统一页面布局风格和提高开发效率，同时也可以统一列表请求接口格式

// 3、积极推进前端基础规范，如项目结构、编码规范和UI规范，需求迭代完毕，主动拉取会议进行 Code Review，并和视觉进行 UI Review

export const getSchema = () => {
  return {
    type: {
      type: 'string',
      title: '类型',
      enum: TASK_TYPES
    },
    status: {
      type: 'string',
      title: '状态',
      enum: EXECUTE_STATUS
    }
  }
}

export const getAddSchema = (dbOptions) => {
  return {
    dbName: {
      required: true,
      type: 'string',
      title: '数据库',
      enum: dbOptions,
    },
    type: {
      required: true,
      type: 'string',
      title: '任务类型',
      enum: TASK_TYPES,
    },
    sql: {
      required: true,
      type: 'textarea',
      title: 'SQL',
      'x-props': {
        rows: 4,
        placeholder: '请输入SQL'
      }
    },
    reason: {
      required: true,
      type: 'textarea',
      title: '原因',
      'x-props': {
        rows: 4,
        placeholder: '请输入原因'
      }
    },
  }
}

export const getColumns = (operations) => {
  const {
    handleDelete,
    handleExecute
  } = operations
  return [
    {
      title: 'userName',
      dataIndex: 'userName',
    },
    {
      title: 'sql',
      dataIndex: 'sql',
    },
    {
      title: '数据库名',
      dataIndex: 'dbName',
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      render: text => matchProperty(text, TASK_TYPES)
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => matchProperty(text, EXECUTE_STATUS)
    },
    {
      title: '执行时间',
      dataIndex: 'gmtExecute',
      render: text => formatDate(text, 'YYYY-MM-DD HH:mm:ss', '暂无')
    },
    {
      title: '原因',
      dataIndex: 'reason',
    },
    {
      title:'操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const isOutTime = record.status === 0
        if (isOutTime) {
          return (
            <Fragment>
              <a onClick={() => handleDelete(record)}>删除</a>
              <a onClick={() => handleExecute(record)} style={{ marginLeft: 4 }}>执行</a>
            </Fragment>
          )
        }
      }
    }
  ]
}
