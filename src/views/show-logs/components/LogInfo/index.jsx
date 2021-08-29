import React, {useEffect, useState, Fragment} from 'react'
import moment from 'moment'
import { Search } from '@/components'
import request from '@/request'
import { CodeEditor } from '@/components'
import './index.less'

const LINK_TYPES = [
  { label: '且', value: 1 },
  { label: '或', value: 2 },
  { label: '非', value: 3 },
]

const schema = {
  key: {
    type: 'string',
    title: '关键词',
  },
  type: {
    type: 'string',
    title: '关联方式',
    enum: LINK_TYPES,
    default: 1,
  },
  line: {
    type: 'number',
    title: '查看行数',
    'x-props': {
      step: 1,
    }
  },
  time: {
    type: 'date',
    title: '时间',
    'x-props': {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm',
      placeholder: '查询某个时刻的日志'
    }
  },
  contextLine: {
    type: 'number',
    title: '上下文行数',
    'x-props': {
      step: 1,
      min: 0,
      max: 99
    }
  }
}

export default (props) => {
  const { ip, catelog, path = '/' } = props
  const [ detail, setDetail ] = useState()
  const [params, setParams] = useState({
    ip,
    catelog,
    path: `/${path}`,
    type: 1,
    line: 100,
    contextLine: 0
  })

  const fetchLogs = (params) => {
    return request.get('/dev-ops/devops/logfind/readLog', params).then(res => {
      if (res.success) {
        setDetail(res.data)
      }
    })
  }

  const handleSearch = (params) => {
    const { time, ...rest } = params
    if (time) {
      rest.time = moment(time).endOf('s').valueOf()
    }
    setParams(rest)
  }

  useEffect(() => {
    path && fetchLogs(params)
  }, [params])

  return (
    <div className="log-info">
      {
        path && (
          <Fragment>
            <div className="log-info__header">
              <label className="title">
                日志文件路径：{path}
              </label>
            </div>
            <div className="log-info__content">
              <Search
                schema={schema}
                params={params}
                onSearch={handleSearch}
              />
              <div className="info">
                <CodeEditor
                  value={detail}
                  language="txt"
                  editable={false}
                  options={{
                    languages: ['txt']
                  }}
                />
              </div>
            </div>
          </Fragment>
        )
      }
    </div>
  )
}
