import React, { useState, useEffect } from 'react'
import { SchemaForm } from '@formily/antd'
import { Layout } from '@/components'
import request from '@/request'
import components from './form'
import { getSchema } from './config'

const { Header, Content } = Layout

export default () => {
  const [dbsList, setDbsList] = useState([])

  const fetchDBList = () => {
    return request.get('/dev-ops/devops/db/dbList').then(res => {
      setDbsList(res.data)
    })
  }

  useEffect(() => {
    fetchDBList()
  }, [])


  const schema = getSchema(dbsList)
  return (
    <Layout>
      <Header title="SQL查询"/>
      <Content>
        <SchemaForm
          labelCol={2}
          validateFirst
          wrapperCol={20}
          components={components}
          schema={{
            type: 'object',
            properties: schema
          }}
        />
      </Content>
    </Layout>
  )
}
