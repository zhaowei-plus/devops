import React from 'react'
import { STATUS } from '../constant'

export const getColumns = () => [
  {
    title: '机器名',
    dataIndex: 'name'
  },
  {
    title: 'IP',
    dataIndex: 'ip'
  },
  {
    title: '状态',
    dataIndex: 'online',
    width: 120,
    render: text => {
      const option = STATUS.find(item => item.value === text)
      if (option) {
        return (
          <div className="status">
            <i className="status__icon" style={{ backgroundColor: option.color }} />
            {option.label}
          </div>
        )
      }
      return '-'
    }
  }
]