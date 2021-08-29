import React, { Fragment } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { SchemaForm, FormButtonGroup, Submit, Reset } from '@formily/antd'

import './index.less'

const formatFormSchema = (schema) => {
  const newSchema = cloneDeep(schema)
  Object.keys(newSchema).forEach((key) => {
    const item = newSchema[key]

    if (['string', 'string', 'number', 'textarea'].includes(item.type)) {
      if (!Reflect.has(item, 'x-props')) {
        item['x-props'] = {}
      }
      if (!Reflect.has(item['x-props'], 'placeholder')) {
        if (Array.isArray(item.enum)) {
          item['x-props'].placeholder = '请选择'
          item['x-props'].getPopupContainer = node => node.parentNode
          if (!Reflect.has(item['x-props'], 'allowClear')) {
            item['x-props'].allowClear = true
          }
        } else {
          item['x-props'].placeholder = '请输入'
        }
      }
    }
  })
  return newSchema
}

const clearObject = (
  params,
  filters = [null, undefined, NaN, '']
) => {
  if (params instanceof Object) {
    const newParams = {}
    Object.keys(params).forEach(key => {
      // 注：这里只对对象字段进行过滤，对数组不做任何处理，只能通过构造函数区分
      if (
        typeof params[key] === 'object' &&
        params[key].constructor === Object
      ) {
        newParams[key] = clearObject(params[key], filters)
      } else if (!filters.includes(params[key])) {
        newParams[key] = params[key]
      }
    })
    return newParams
  }
  return params
}

const Search = (props) => {
  const {
    schema,
    onSearch,
    params = {},
    ...rest
  } = props
  const onSubmit = params => {
    onSearch(clearObject(params))
  }

  return (
    <SchemaForm
      onSubmit={onSubmit}
      onReset={onSubmit}
      className="search"
      schema={{
        type: 'object',
        properties: formatFormSchema(schema),
      }}
      defaultValue={params}
      {...rest}
    >
      <FormButtonGroup className="search__actions">
        <Submit loading={false}>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  )
}

export default Search