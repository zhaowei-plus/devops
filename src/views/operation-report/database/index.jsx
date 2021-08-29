import React from 'react'
import { OperationReportFrame } from '@/components'

const Database = () => {
  return (
    <OperationReportFrame
      title="数据库"
      page="/grafana/dashboard/db/mysql-overview?orgId=1&kiosk=tv"
    />
  )
}

export default Database
