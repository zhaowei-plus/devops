import React, { Fragment, useMemo } from 'react'
import { Modal, Button, message } from 'antd'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'
import request from '@/request'
import { formatFormSchema } from '@/utils'
import { getAddSchema } from '../../config'

const AddModal = (props) => {
  const { params = {}, onCancel, onOk } = props
  const { title, type, record } = params
  const actions = useMemo(() => createAsyncFormActions(), [])

  const handleSubmit = (values) => {
    return request.post('/dev-ops/monitor/editAlarm', values).then(res => {
      message.success(`${title}成功`)
      onOk()
    })
  }

  const handleOk = () => {
    return actions.submit()
  }

  const initialValues = useMemo(() => {
    if (type === 'add') {
      return {
        type: 1,
        onOff: false,
      }
    }
    return record
  }, [record])
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
        onSubmit={handleSubmit}
        previewPlaceholder="暂无数据"
        editable={type !== 'detail'}
        initialValues={initialValues}
        schema={{
          type: 'object',
          properties: formatFormSchema(schema)
        }}
      />
    </Modal>
  )
}

export default AddModal
