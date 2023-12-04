import React from 'react'
import styled from 'styled-components'

const DevtoolsWrapper = styled.div`
  flex: 1;
  display: flex;
  background-color: ${(props) => props.theme.colorBgContent};

  .webview {
    flex: 1;
  }
`

const Devtools: React.FC<{ moving: boolean }> = (props) => {
  return (
    <DevtoolsWrapper>
      <webview
        id='devtoolsWebview'
        className='webview'
        src='devtools://devtools/bundled/devtools_app.html'
        style={{ pointerEvents: props.moving ? 'none' : 'auto' }}
      ></webview>
    </DevtoolsWrapper>
  )
}

export default Devtools
