import React from 'react'
import styled from 'styled-components'

const DevtoolsWrapper = styled.div`
  flex: 1;
`

const Devtools: React.FC = () => {
  return (
    <DevtoolsWrapper>
      <webview></webview>
    </DevtoolsWrapper>
  )
}

export default Devtools
