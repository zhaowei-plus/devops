import React from 'react'
import SchemaForm, { SchemaMarkupField as Field, Submit } from '@formily/antd'
import request from '@/request'
import './index.less'

const Login = (props) => {
  console.log('Login props:', props)
  const { history } = props

  const handleSubmit = (params = {}) => {
    return request.post('/dev-ops/login/outLogin', params).then(res => {
      if (res.success) {
        history.push('/')
      }
    })
  }

  return (
    <div className="login">
      <div className="login__header">
        <i className="icon icon-devops"/>
        <div className="title">DevOps</div>
      </div>
      <div className="login__content">
        <div className="login-from">
          <SchemaForm
            labelCol={0}
            wrapperCol={24}
            onSubmit={handleSubmit}
          >
            <Field
              type="string"
              name="mobile"
              x-props={{
                placeholder: '请输入手机号',
              }}
              x-rules={[
                { required: true, message: '请输入手机号' }
              ]}
            />
            <Field
              type="xm-password"
              name="password"
              x-props={{
                placeholder: '请输入密码',
              }}
              x-rules={[
                { required: true, message: '请输入密码' }
              ]}
            />
            <Submit className="btn-submit">登录</Submit>
          </SchemaForm>
        </div>
      </div>
    </div>
  )
}

export default Login
