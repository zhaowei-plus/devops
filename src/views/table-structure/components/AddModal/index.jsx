import React, { useMemo, useEffect, useState } from 'react'
import {message, Modal} from 'antd'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'
import request from '@/request'
import { formatFormSchema } from '@/utils'
import { getAddSchema } from '../../config'

export default (props) => {
  const { onOk, onCancel } = props
  const [dbOptions, setDbOptions] = useState([])
  const actions = useMemo(() => createAsyncFormActions(), [])

  const handleOk = () => {
    return actions.submit().then(({ values }) => {
      return request.post('/dev-ops/devops/db/submitSql', values)
        .then(() => {
          message.success('添加成功')
          onOk()
        })
    })
  }

  const fetchDBList = () => {
    return request.get('/dev-ops/devops/db/dbList')
      .then(data => {
        setDbOptions(data)
      })
  }

  useEffect(() => {
    fetchDBList()
  }, [])

  const schema = getAddSchema(dbOptions)
  return (
    <Modal
      visible
      centered
      title="添加"
      onOk={handleOk}
      onCancel={onCancel}
    >
      <SchemaForm
        labelCol={6}
        validateFirst
        wrapperCol={16}
        actions={actions}
        schema={{
          type: 'object',
          properties: formatFormSchema(schema),
        }}
      />
    </Modal>
  )

}
