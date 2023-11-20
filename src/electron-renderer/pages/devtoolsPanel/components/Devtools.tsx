import React from 'react'
import styled, { IStyledComponent } from 'styled-components'

const DevtoolsWrapper: IStyledComponent<'web'> = styled.div`
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