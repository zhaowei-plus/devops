import { formatDate } from '@/utils'

export const getSchema = () => ({
  account: {
    type: 'string',
    title: '登录账号'
  },
  '[startDate,endDate]': {
    type: 'daterange',
    title: '日期',
    'x-props': {
      placeholder: ['开始时间', '结束时间']
    }
  }
})

export const getColumns = () => [
  {
    title: '账号',
    dataIndex: 'account',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
  {
    title: '操作者',
    dataIndex: 'operator',
  },
  {
    title: '操作时间',
    dataIndex: 'gmtCreate',
    render: text => formatDate(text)
  },
  {
    title: '结果',
    dataIndex: 'result',
  }
]
