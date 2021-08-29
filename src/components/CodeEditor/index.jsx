import React, { useState, forwardRef, useImperativeHandle } from 'react'
import MonacoEditor from '@uiw/react-monacoeditor'
import cs from 'classnames'
import './index.less'

const originOptions = {
  foldingStrategy: 'indentation', // 代码小段可折叠
  selectOnLineNumbers: true,
  roundedSelection: false,
  cursorStyle: 'line',
  automaticLayout: true, // 自适应布局
  overviewRulerBorder: false, // 不要滚动调的边框
  tabSize: 2,
  theme: 'vs-dark',
  glyphMargin: false, // 字形边缘
  // fontSize: 16,
  // minimap: {
  //   enabled: false, // 不要小地图
  // }
}

const CodeEditor = forwardRef((props, ref) => {
  const {
    value,
    editable,
    language,
    options = {},
    onChange
  } = props

  const [editor, setEditor] = useState()
  const [fullscreen, setFullscreen] = useState(false)

  const handleTrigger = (event) => {
    event.stopPropagation()
    setFullscreen(!fullscreen)
  }

  const handleChange = (content) => {
    onChange && onChange(content)
  }

  useImperativeHandle(ref,  () => {
    return {
      editor,
      getResult: () => ({
        range: editor.getModel().getValueInRange(editor.getSelection()),
        value: editor.getValue(),
      })
    }
  }, [editor])

  return (
    <div
      className={
        cs('xm-code-editor', {
          'fullscreen': fullscreen
        })
      }
    >
      <div className="xm-code-editor__header">
        {
          fullscreen ? (
            <a onClick={handleTrigger}>恢复</a>
          ) : (
            <a onClick={handleTrigger}>全屏</a>
          )
        }
      </div>
      <div className="xm-code-editor__content">
        <MonacoEditor
          key={fullscreen}
          value={value}
          language={language}
          options={{
            ...originOptions,
            ...options,
            readOnly: !editable,
          }}
          onChange={handleChange}
          editorDidMount={editor => setEditor(editor)}
        />
      </div>
    </div>
  )
})

export default CodeEditor
