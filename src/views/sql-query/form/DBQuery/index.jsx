import React, { useMemo, useState, useRef } from 'react'
import { Select, Button, message } from 'antd'
import { useSchemaProps } from '@formily/antd'
import { Resizable } from 're-resizable'
import { CodeEditor } from '@/components'
import './index.less'

import './index.less'

const { Option } = Select

const DBQuery = props => {
  const editorRef = useRef()
  const [dbName, setDBName] = useState()
  const { form } = useSchemaProps()

  const handleSearch = () => {
    const { value, range } = editorRef.current.getResult()
    if (!dbName) {
      message.warn('请选择数据库')
      return false
    }

    if (!value && !range) {
      message.warn('请输入SQL脚本')
      return false
    }
    form.notify('execute', { dbName, sql: range || value })
  }

  const options = useMemo(() => props.props.enum.map(value => ({ label: value, value })), [props.props.enum])
  return (
    <div className="db-query">
      <div className="db-query__header">
        <label className="title">数据库：</label>
        <Select
          value={dbName}
          placeholder="请选择"
          style={{
            width: 200,
            marginRight: 20
          }}
          onChange={dbName => setDBName(dbName)}
        >
          {
            options.map(option => (
              <Option key={option.value}>{option.value}</Option>
            ))
          }
        </Select>
        <Button
          type="primary"
          onClick={handleSearch}
        >
          查询
        </Button>
      </div>
      <div className="db-query__content">
        <Resizable
          className="sql-editor"
          defaultSize={{
            height: 180
          }}
        >
          <CodeEditor
            value="SELECT * FROM A"
            ref={editorRef}
            language="sql"
            editable={true}
            options={{
              fontSize: 16
            }}
          />
        </Resizable>
      </div>
    </div>
  )
}

DBQuery.isFieldComponent = true

export default DBQuery
