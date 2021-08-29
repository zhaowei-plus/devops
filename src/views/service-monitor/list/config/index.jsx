import React, { Fragment } from 'react'
import { matchProperty } from '@/utils'
import { SERVICE_STATUS, EXPECT_STATUS } from '../constant'

export const getColumns = (handleDetail) => [
  {
    title: '服务名',
    dataIndex: 'proxy',
    render: (text, record) => (<a onClick={() => handleDetail(record)}>{text}</a>)
  },
  {
    title: '机器IP',
    dataIndex: 'hostIp',
  },
  {
    title: '服务端口',
    dataIndex: 'hostPort',
  },
  {
    title: '服务状态',
    dataIndex: 'status',
    render: text => matchProperty(text, SERVICE_STATUS)
  },
  {
    title: '预期状态',
    dataIndex: 'flag',
    render: text => {
      const option = EXPECT_STATUS.find(item => item.value === text)
      if (option) {
        return (
          <Fragment>
            <i className="dib mr-10 w12 h12 br-half va-m" style={{backgroundColor: option.color}} />
            <span className="va-m">{option.label}</span>
          </Fragment>
        )
      }
      return '-'
    }
  }
]