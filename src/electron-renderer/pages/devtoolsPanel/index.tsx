import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Simulator from './components/Simulator'
import Devtools from './components/Devtools'

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
`

function DevtoolsPanel(): React.JSX.Element {
  const [moving, setMoving] = useState<boolean>(false)

  return (
    <PanelWrapper>
      <Header />
      <MainWrapper>
        <Simulator minWidth='10%' maxWidth='60%' moving={moving} setMoving={setMoving}></Simulator>
        <Devtools moving={moving}></Devtools>
      </MainWrapper>
    </PanelWrapper>
  )
}

export default DevtoolsPanel
