import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { FormItem, InternalFieldList as FieldList } from '@formily/antd'
import { Input, Select } from '@formily/antd-components'
import 'antd/dist/antd.css'
import styled from 'styled-components'
import { PLUGIN_TYPES } from '../../constant'

const RowStyleLayout = styled(props => {
    return <div {...props} />

})`
  >.ant-form-item {
    display: inline-flex;
    margin-right: 10px;
    margin-bottom: 16px;
    width:40%;
  }
`

const ArrayPlugin = props => {
    const { initialValue } = props
    return (
        <FieldList
            name="userList"
            initialValue={initialValue}
        >
            {({ state, mutators }) => {
                const onAdd = () => mutators.push()
                if (state.value && state.value.length === 0) {
                    return <><h1>暂无数据</h1><Button onClick={onAdd}><PlusOutlined /></Button></>
                }
                return (
                    <div>
                        <p className="ant-row"><label className="ant-col-4 ant-form-item-label">plugin：</label></p>
                        {state.value.map((item, index) => {
                            const onRemove = index => mutators.remove(index)
                            return (
                                <RowStyleLayout key={index}>
                                    <FormItem
                                        name={`userList.${index}.name`}
                                        component={Select}
                                        dataSource={PLUGIN_TYPES}
                                    />
                                    <FormItem
                                        name={`userList.${index}.value`}
                                        component={Input}

                                    />
                                    <Button onClick={() => onRemove(index)}><DeleteOutlined /></Button>
                                </RowStyleLayout>
                            )
                        })}
                        <Button onClick={onAdd}><PlusOutlined /></Button>
                    </div>
                )
            }}

        </FieldList>
    )
}

ArrayPlugin.isFieldComponent = true

export default ArrayPlugin