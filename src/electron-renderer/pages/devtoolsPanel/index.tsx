import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Simulator from './components/Simulator'
import Devtools from './components/Devtools'
import { emittedOnce } from '@/shared/utils'
import emulatedDevices from '@/emulated-devices.json'
import type { First } from '@/renderer'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

const scaleList: Array<number> = [1, 0.85, 0.75, 0.5]

type Device = First<typeof emulatedDevices>

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
  const device = useSelector((state: RootState) => state.devtools.device)

  const reloadSimulator = () => {
    const simulatorWebview = document.querySelector('#simulatorWebview') as ElectronWebViewElement
    simulatorWebview.reload()
  }

  useEffect(() => {
    const simulatorWebview = document.querySelector('#simulatorWebview') as ElectronWebViewElement
    const devtoolsWebview = document.querySelector('#devtoolsWebview') as ElectronWebViewElement

    Promise.all([emittedOnce(simulatorWebview, 'dom-ready'), emittedOnce(devtoolsWebview, 'dom-ready')]).then(() => {
      const simulatorContentId = simulatorWebview?.getWebContentsId()

      const devtoolsContentId = devtoolsWebview?.getWebContentsId()

      if (simulatorContentId && devtoolsContentId) {
        window.electronAPI.send('set-devtools', { simulatorContentId, devtoolsContentId, device })
      } else {
        console.warn('webview contentId 获取失败')
      }
    })
  }, [])

  return (
    <PanelWrapper>
      <Header reloadSimulator={reloadSimulator} />
      <MainWrapper>
        <Simulator
          minWidth='10%'
          maxWidth='60%'
          moving={moving}
          setMoving={setMoving}
          devices={emulatedDevices as Array<Device>}
          scaleList={scaleList}
        ></Simulator>
        <Devtools moving={moving}></Devtools>
      </MainWrapper>
    </PanelWrapper>
  )
}

export default DevtoolsPanel
export type { Device }
