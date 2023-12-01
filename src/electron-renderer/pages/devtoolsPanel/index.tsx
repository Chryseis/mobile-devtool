import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Simulator from './components/Simulator'
import Devtools from './components/Devtools'
import { emittedOnce } from '@/shared/utils'
import emulatedDevices from '@/emulated-devices.json'
import type { First } from '@/renderer'

const scaleList: Array<string> = ['100%', '75%', '50%', '25%']

type Device = First<typeof emulatedDevices>

const DEFAULT_DEVICE = emulatedDevices.find((o) => o.title === 'iPhone 6/7/8') as Device

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
  const [device, setDevice] = useState<Device>(DEFAULT_DEVICE)

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
        window.electronAPI.send('set-devtools', { simulatorContentId, devtoolsContentId })
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
