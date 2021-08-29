import { lazy } from 'react'
export const routes = [
  {
    title: '登录页',
    path: '/login',
    component: lazy(() => import('@/views/login')),
  },
  {
    title: '未知页面',
    path: '/404',
    component: lazy(() => import('@/views/not-found')),
  },
]

export const cacheRoutes = [
  {
    path: '/operation',
    title: '运维',
    routes: [
      {
        title: '看门狗',
        path: '/operation/watch-dog',
        component: lazy(() => import('@/views/watch-dog')),
        isDefault: true,
      },
      {
        title: '镜像管理',
        path: '/operation/mirror-manage',
        component: lazy(() => import('@/views/mirror-manage')),
      },
      {
        title: 'Yaml管理',
        path: '/operation/yaml-manage',
        component: lazy(() => import('@/views/yaml-manage')),
      },
      {
        title: '前端资源管理',
        path: '/operation/fe-manage',
        component: lazy(() => import('@/views/fe-manage')),
      },
      {
        title: '前端配置',
        path: '/operation/fe-config',
        component: lazy(() => import('@/views/fe-config')),
      },
      {
        title: '后端配置',
        path: '/operation/ae-config',
        component: lazy(() => import('@/views/ae-config')),
      },
      {
        title: '发布记录',
        path: '/operation/publish-record',
        component: lazy(() => import('@/views/publish-record')),
      },
      {
        title: '远程查看',
        path: '/operation/show-logs',
        component: lazy(() => import('@/views/show-logs')),
      },
    ],
  },
  {
    path: '/database',
    title: 'DB后台',
    routes: [
      {
        title: 'SQL查询',
        path: '/database/sql-query',
        component: lazy(() => import('@/views/sql-query')),
      },
      {
        title: '订正|导出|表结构',
        path: '/database/table-structure',
        component: lazy(() => import('@/views/table-structure')),
      },
      {
        title: '操作记录列表',
        path: '/database/record-list',
        component: lazy(() => import('@/views/record-list')),
      }
    ],
  },
  {
    path: '/monitor',
    title: '监控',
    routes: [
      {
        title: '任务',
        path: '/monitor/tasks',
        component: lazy(() => import('@/views/tasks')),
      },
      {
        title: '报警规则',
        path: '/monitor/alarm-rules',
        component: lazy(() => import('@/views/alarm-rules')),
      },
      {
        title: '报警分组',
        path: '/monitor/alarm-group',
        component: lazy(() => import('@/views/alarm-group')),
      },
      {
        title: '健康检查',
        // visible: false,
        path: '/monitor/health-check',
        component: lazy(() => import('@/views/health-check')),
      },
      {
        title: '运行报表',
        path: '/monitor/operation-report',
        children: [
          {
            title: '服务器',
            path: '/monitor/operation-report/server',
            component: lazy(() => import('@/views/operation-report/server')),
          },
          {
            title: '数据库',
            path: '/monitor/operation-report/database',
            component: lazy(() => import('@/views/operation-report/database')),
          },
          {
            title: 'Redis',
            path: '/monitor/operation-report/redis',
            component: lazy(() => import('@/views/operation-report/redis')),
          },
          {
            title: 'Docker',
            path: '/monitor/operation-report/docker',
            component: lazy(() => import('@/views/operation-report/docker')),
          },
          {
            title: '服务状态',
            path: '/monitor/operation-report/service-status',
            component: lazy(() => import('@/views/operation-report/service-status')),
          }
        ],
      }
    ],
  },
  {
    path: '/gateway',
    title: '网关',
    visible: false,
    routes: [
      {
        title: '路由配置',
        path: '/gateway/route-config',
        component: lazy(() => import('@/views/route-config')),
      },
      {
        title: '插件配置',
        path: '/gateway/plugin-config',
        component: lazy(() => import('@/views/plugin-config')),
      }
    ],
  },
]
