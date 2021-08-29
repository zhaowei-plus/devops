import { matchProperty, formatDate } from '@/utils'
import { TASK_TYPES, EXECUTE_STATUS } from '@/assets/constant'

export const getSchema = () => {
  return {
    '[executeStart,executeEnd]': {
      type: 'daterange',
      title: '操作时间',
      'x-props': {
        // showTime: true,
        // format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间']
      }
    },
    type: {
      type: 'string',
      title: '任务类型',
      enum: [
        { label: '查询', value: 1 },
        ...TASK_TYPES
      ],
    },
    status: {
      type: 'string',
      title: '状态',
      enum: EXECUTE_STATUS,
    },
    name: {
      type: 'string',
      title: '用户名'
    }
  }
}

export const getColumns = () => {
  return [
    {
      title: '用户名',
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
      render: text => formatDate(text, 'YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '原因',
      dataIndex: 'reason',
    },
  ]
}
