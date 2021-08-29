import React, { useMemo, useEffect, useState } from 'react'
import { message, Modal } from 'antd'
import {
    SchemaForm,
    createAsyncFormActions,
} from '@formily/antd'
import request from '@/request'
import { formatFormSchema } from '@/utils'
import { getAddSchema } from '../../config'

export default (props) => {
    const { onOk, onCancel, params } = props
    const { title, record } = params;
    const actions = useMemo(() => createAsyncFormActions(), [])
    const initData = useMemo(() => {
        return { ...record }
    }, [record])
    const handleOk = () => {
        return actions.submit().then(({ values }) => {
            return request.post('/awg-admin/api/plugin/save', values)
                .then(() => {
                    message.success('添加成功')
                    onOk()
                })
        })
    }


    useEffect(() => {

    }, [])

    const schema = getAddSchema()
    return (
        <Modal
            visible
            centered
            title={title}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <SchemaForm
                labelCol={6}
                validateFirst
                wrapperCol={16}
                initialValues={initData}
                actions={actions}
                schema={{
                    type: 'object',
                    properties: formatFormSchema(schema),
                }}
            />
        </Modal>
    )

}
