import React from 'react'
import { OperationReportFrame } from '@/components'

const Redis = () => {
  return (
    <OperationReportFrame
      title="Redis"
      page="/grafana/dashboard/db/redis?orgId=1&kiosk=tv"
    />
  )
}

export default Redis
