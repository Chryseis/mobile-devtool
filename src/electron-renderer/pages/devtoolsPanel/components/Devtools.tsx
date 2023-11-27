import React from 'react'
import styled from 'styled-components'

const DevtoolsWrapper = styled.div`
  flex: 1;
  display: flex;

  .webview {
    flex: 1;
  }
`

const Devtools: React.FC<{ moving: boolean }> = (props) => {
  return (
    <DevtoolsWrapper>
      <webview className='webview' style={{ pointerEvents: props.moving ? 'none' : 'auto' }}></webview>
    </DevtoolsWrapper>
  )
}

export default Devtools
