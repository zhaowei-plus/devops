import React from 'react'
import ReactDiffViewer from 'react-diff-viewer'

export default (props) => {
  const { title = [], value = [] } = props
  return (
    <ReactDiffViewer
      splitView
      oldValue={value[0]}
      newValue={value[1]}
      leftTitle={title[0]}
      rightTitle={title[1]}
    />
  )
}