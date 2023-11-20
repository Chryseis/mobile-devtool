import React from 'react'
import styled, { IStyledComponent } from 'styled-components'
import Header from './components/Header'
import Simulator from './components/Simulator'
import Devtools from './components/Devtools'

const PanelWrapper: IStyledComponent<'web'> = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const MainWrapper: IStyledComponent<'web'> = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
`

function DevtoolsPanel(): React.JSX.Element {
  return (
    <PanelWrapper>
      <Header />
      <MainWrapper>
        <Simulator></Simulator>
        <Devtools></Devtools>
      </MainWrapper>
    </PanelWrapper>
  )
}

export default DevtoolsPanel
