import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Simulator from './components/Simulator'
import Devtools from './components/Devtools'
import { emittedOnce } from '@/shared/utils'

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

  useEffect(() => {
    const simulatorWebview = document.querySelector('#simulatorWebview') as ElectronWebViewElement
    const devtoolsWebview = document.querySelector('#devtoolsWebview') as ElectronWebViewElement

    Promise.all([emittedOnce(simulatorWebview, 'dom-ready'), emittedOnce(devtoolsWebview, 'dom-ready')]).then(() => {
      const simulatorContentId = simulatorWebview?.getWebContentsId()

      const devtoolsContentId = devtoolsWebview?.getWebContentsId()

      window.electronAPI.send('set-devtools', { simulatorContentId, devtoolsContentId })
    })
  }, [])

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
