import React, { Fragment, useMemo } from 'react'
import { Modal, Button, message } from 'antd'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'
import { ArrayTable } from '@formily/antd-components'
import request from '@/request'
import { formatFormSchema } from '@/utils'
import { getAddSchema } from '../../config'
import './index.less'
import { toArr } from '@formily/shared'

const AddModal = (props) => {
  const { params = {}, onCancel, onOk } = props
  const { title, type, record } = params
  const actions = useMemo(() => createAsyncFormActions(), [])

  const toObj = (arr) => {
    let newObj = {}
    if (arr && arr instanceof Array) {
      arr.map(item => {
        newObj[item.name] = item.value
      })
    }
    return newObj
  }

  const toArray = (obj) => {
    return Object.keys(obj).map(key => ({ name: key, value: obj[key] }))
  }

  const initValue = useMemo(() => {
    if (record) {
      const param = toArray(JSON.parse(record.param))
      const header = toArray(JSON.parse(record.header))
      return { ...record, param, header }
    } else {
      return {}
    }

  }, [record])

  const handleSubmit = (values) => {
    const param = JSON.stringify(toObj(values.param))
    const header = JSON.stringify(toObj(values.header))
    return request.post('/dev-ops/interface/editCheck', { ...values, param, header }).then(res => {
      message.success(`${title}成功`)
      onOk()
    })
  }

  const handleOk = () => {
    return actions.submit()
  }
  const schema = getAddSchema()
  return (
    <Modal
      visible
      centered
      title={title}
      onOk={handleOk}
      onCancel={onCancel}
      className='health-check_add-modal'
    >
      <SchemaForm
        labelCol={5}
        wrapperCol={18}
        actions={actions}
        onSubmit={handleSubmit}
        components={{ ArrayTable }}
        previewPlaceholder="暂无数据"
        editable={type !== 'detail'}
        initialValues={initValue}
        schema={{
          type: 'object',
          properties: formatFormSchema(schema)
        }}
      />
    </Modal>
  )
}

export default AddModal
