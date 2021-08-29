import React from 'react'
import './index.less'

const OperationReportFrame = (props) => {
  const { page } = props
  return (
    <div className="operation-report-frame">
      <iframe
        frameBorder="0"
        width="100%"
        height="100%"
        src={`${window.location.origin}${page}`}
      />
    </div>
  )
}
export default OperationReportFrame
