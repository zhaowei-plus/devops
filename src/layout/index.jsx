import React, { Suspense } from 'react'
import ReactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider, Skeleton } from 'antd'
import { setup } from '@formily/antd-components'
import Routes from '@/routes'
import { CacheProvider } from '@/cache'
import Container from './Container'

import zhCN from 'antd/lib/locale/zh_CN'

import 'antd/dist/antd.css'
import './index.less'

import '@/form'

setup()

ReactDom.render(
  <ConfigProvider locale={zhCN}>
    <HashRouter>
      <CacheProvider>
        <Container>
          <Suspense fallback={<Skeleton />}>
            <Routes />
          </Suspense>
        </Container>
      </CacheProvider>
    </HashRouter>
  </ConfigProvider>,
  document.getElementById('root'),
)


