import React, { Fragment, useMemo, useState, useEffect } from 'react'
import { Modal, Button, message } from 'antd'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'
import request from '@/request'
import { formatFormSchema } from '@/utils'
import { getAddSchema } from '../../config'

const AddModal = (props) => {
  const { params = {}, onCancel, onOk } = props
  const { title, type, id } = params
  const [detail, setDetail] = useState()
  const actions = useMemo(() => createAsyncFormActions(), [])

  const fetchDetail = (id) => {
    return request.get('/dev-ops/monitor/getAlarmGroup', { id }).then(res => {
      setDetail(res.data)
    })
  }

  const handleSubmit = (values) => {
    return request.post('/dev-ops/monitor/editAlarmGroup', values).then(res => {
      message.success(`${title}成功`)
      onOk()
    })
  }

  const handleOk = () => {
    return actions.submit()
  }

  useEffect(() => {
    id && fetchDetail(id)
  }, [id])

  const schema = getAddSchema()
  return (
    <Modal
      visible
      centered
      title={title}
      onCancel={onCancel}
      footer={(
        <Fragment>
          {
            type === 'detail' ? (
              <Button
                type="primary"
                onClick={onCancel}
              >
                确定
              </Button>
            ) : (
              <Fragment>
                <Button
                  onClick={onCancel}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  onClick={handleOk}
                >
                  确定
                </Button>
              </Fragment>
            )
          }
        </Fragment>
      )}
    >
      <SchemaForm
        labelCol={6}
        wrapperCol={16}
        actions={actions}
        initialValues={detail}
        onSubmit={handleSubmit}
        previewPlaceholder="暂无数据"
        editable={type !== 'detail'}
        schema={{
          type: 'object',
          properties: formatFormSchema(schema)
        }}
      />
    </Modal>
  )
}

export default AddModal
