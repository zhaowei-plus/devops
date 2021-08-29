import React from 'react'

import './index.less'

export default (props) => {
  const { processes = [], onInfo } = props
  return (
    <div className="process-tags">
      {
        processes.length > 0 ? (
          <div className="process-tags__content">
            {
              processes.map((process, index) => (
                <div
                  className="tag"
                  key={index}
                  onClick={() => onInfo(process)}
                >
                  {process.processName}
                </div>
              ))
            }
          </div>
        ) : '无相关进程'
      }
    </div>
  )
}