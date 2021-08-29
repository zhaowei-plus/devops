import React, { useMemo, useEffect, useState } from 'react'
import { message, Modal } from 'antd'
import {
    SchemaForm,
    createAsyncFormActions,
} from '@formily/antd'
import request from '@/request'
import { formatFormSchema } from '@/utils'
import ArrayPlugin from '../ArrayPlugin'
import { getAddSchema } from '../../config'
import './index.less'

export default (props) => {
    const { onOk, onCancel, params } = props
    const { title, record } = params;
    const [dbOptions, setDbOptions] = useState([])
    const actions = useMemo(() => createAsyncFormActions(), [])
    const initData = useMemo(() => {
        if (record) {
            const plugins = Object.keys(record.settings.pluginConfigs).map(name => ({
                name: name,
                value: record.settings.pluginConfigs[name]
            }))
            return { ...record, plugins }
        }
        return record;
    }, [record])
    const handleOk = () => {
        return actions.submit().then(({ values }) => {
            let pluginConfigs = {}
            values.plugins && Object.assign({}, values.plugins.map(item => {
                pluginConfigs[item.name] = item.value
            }))
            const { plugins, ...rest } = values;
            return request.post('/awg-admin/api/location/save', { ...rest, settings: { pluginConfigs } })
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
            wrapClassName="route-config-add-modal"
            title={title}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <SchemaForm
                labelCol={4}
                validateFirst
                wrapperCol={20}
                actions={actions}
                initialValues={initData}
                components={{
                    ArrayPlugin
                }}
                schema={{
                    type: 'object',
                    properties: formatFormSchema(schema),
                }}
            />
        </Modal>
    )

}
