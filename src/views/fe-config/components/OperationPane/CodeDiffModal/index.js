import React from 'react'
import { Modal } from 'antd'
import DiffViewer from 'react-diff-viewer'

export default (props) => {
  const { title = [], value = [], onCancel } = props
  return (
    <Modal
      visible
      width={800}
      title="修改比较"
      onCancel={onCancel}
    >
      <DiffViewer
        splitView
        leftTitle={title[0]}
        rightTitle={title[1]}
        oldValue={value[0]}
        newValue={value[1]}
      />
    </Modal>
  )
}