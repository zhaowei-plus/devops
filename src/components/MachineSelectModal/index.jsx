import React, { useEffect, useState } from 'react'
import { Modal, Checkbox, message } from 'antd'
import request from '@/request'
import './index.less'

export default (props) => {
  const { params = {}, onCancel, onOk } = props
  const { title } = params
  const [select, setSelect] = useState([])
  const [dogOptions, setDogOptions] = useState([])

  const fetchDogs = () => {
    request.get('/dev-ops/devops/monitor/dogs').then(res => {
      setDogOptions(res.data)
    })
  }

  const handleChange = (params) => {
    setSelect(params)
  }

  const handleOk = () => {
    if (select.length === 0) {
      message.warn('请选择主机')
      return false
    }
    return onOk(select)
  }

  useEffect(() => {
    fetchDogs()
  }, [])

  return (
    <Modal
      visible
      title="选择主机"
      onOk={handleOk}
      onCancel={onCancel}
      className="machine-select-modal"
    >
      {
        title && (
          <div className="machine-select-modal__header">
            {title}
          </div>
        )
      }
      <div className="machine-select-modal__content">
        <Checkbox.Group onChange={handleChange}>
          {
            dogOptions.map(option => (
              <div className="item" key={option.ip}>
                <Checkbox
                  value={option.ip}
                  disabled={option.online === 'false'}
                >
                  {option.name}({option.ip})
                </Checkbox>
              </div>
            ))
          }
        </Checkbox.Group>
      </div>
    </Modal>
  )
}
