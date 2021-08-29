import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'

export const formatDate = (
  value,
  format = 'YYYY-MM-DD HH:mm:ss',
  illegalCharacter = '-'
) => {
  if (value) {
    return moment(value).format(format)
  }
  return illegalCharacter
}

export const matchProperty = (
  key,
  source = [],
  illegalCharacter = '-',
  keyName = 'value',
  valueName = 'label'
) => {
  const item = source.find(item => {
    return item[`${keyName}`] === key
  })

  if (item) {
    return item[`${valueName}`]
  }
  return illegalCharacter
}

export const formatFormSchema = schema => {
  const newSchema = cloneDeep(schema)
  Object.keys(newSchema).forEach(key => {
    const item = newSchema[key]
    if (['string', 'number', 'textarea'].includes(item.type)) {
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

export const updateTreeData = (list = [], key, children = []) => {
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      }
    } else if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      }
    }
    return node
  })
}