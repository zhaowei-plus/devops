import React from 'react'
import { Drawer } from 'antd'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd'
import { FormBlock, FormSlot } from '@formily/antd-components'

import './index.less'

export default (props) => {
  const { params = {}, onCancel, onShowProcess } = props
  const { proxy, proxys = [], ...rest } = params

  return (
    <Drawer
      visible
      closable
      width={500}
      placement="right"
      onClose={onCancel}
      className="process-info"
    >
      <SchemaForm
        labelCol={6}
        validateFirst
        wrapperCol={16}
        editable={false}
        initialValues={params}
        previewPlaceholder="-"
      >
        <FormBlock title={`${proxy}详细信息`}>
          {
            Object.keys(rest).map((name, index) => (
              <Field
                type="string"
                key={index}
                name={name}
                title={name}
              />
            ))
          }
        </FormBlock>
        <FormBlock title="proxy列表">
          <FormSlot>
            {
              (proxys || []).map((proxy, index) => (
                <div className="item" key={index}>
                  {proxy}
                  <a
                    style={{ margin: '0 10px' }}
                    onClick={() => onShowProcess(proxy)}
                  >
                    查看相关进程
                  </a>
                </div>
              ))
            }
          </FormSlot>
        </FormBlock>
      </SchemaForm>
    </Drawer>
  )
}