import React from 'react'
import { OperationReportFrame } from '@/components'

const Docker = () => {
  return (
    <OperationReportFrame
      title="docker"
      page="/grafana/dashboard/db/docker?orgId=1&kiosk=tv"
    />
  )
}

export default Docker
