import React from 'react'
import { OperationReportFrame } from '@/components'

const Server = () => {
  return (
    <OperationReportFrame
      title="服务器"
      page="/grafana/dashboard/db/server-resource?orgId=1&kiosk=tv"
    />
  )
}

export default Server
