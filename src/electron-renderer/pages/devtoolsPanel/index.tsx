import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Drawer } from 'antd'
import Header from './components/Header'
import Simulator from './components/Simulator'
import Devtools from './components/Devtools'
import FuncTabs from './components/FuncTabs'
import { emittedOnce } from '@/shared/utils'
import emulatedDevices from '@/emulated-devices.json'
import type { First } from '@/renderer'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

const scaleList: Array<number> = [1, 0.85, 0.75, 0.5]

const systemBarHeight = 20

type Device = First<typeof emulatedDevices>

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const MainWrapper = styled.div<{ ref: RefObject<HTMLDivElement> }>`
  flex: 1;
  display: flex;
  height: 100%;
`

const FuncDrawer = styled(Drawer)`
  .ant-drawer-header {
    display: none;
  }

  .ant-drawer-body {
    padding-top: unset;
  }
`

function DevtoolsPanel(): React.JSX.Element {
  const mainWrapperRef = useRef<HTMLDivElement>(null)

  const [moving, setMoving] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const device = useSelector((state: RootState) => state.devtools.device)

  const navigatorHeight = useMemo(() => {
    return device['user-agent'].indexOf('iPhone') > -1 ? 44 : 48
  }, [device])

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
        window.electronAPI.send('set-devtools', {
          simulatorContentId,
          devtoolsContentId,
          device: {
            width: device.screen.vertical.width,
            height: device.screen.vertical.height - navigatorHeight - systemBarHeight,
            dpr: device.screen['device-pixel-ratio'],
          },
        })
      } else {
        console.warn('webview contentId 获取失败')
      }
    })
  }, [device, navigatorHeight])

  useEffect(() => {
    const simulatorWebview = document.querySelector('#simulatorWebview') as ElectronWebViewElement
    simulatorWebview.addEventListener('did-start-loading', () => {
      setLoading(true)
    })

    simulatorWebview.addEventListener('did-stop-loading', () => {
      setLoading(false)
    })

    return () => {}
  }, [])

  return (
    <PanelWrapper>
      <Header
        reloadSimulator={reloadSimulator}
        handleDrawer={() => setOpen((prevState) => !prevState)}
        isLoading={loading}
      />
      <MainWrapper ref={mainWrapperRef}>
        <Simulator
          minWidth='20%'
          maxWidth='60%'
          moving={moving}
          setMoving={setMoving}
          devices={emulatedDevices as Array<Device>}
          scaleList={scaleList}
          navigatorHeight={navigatorHeight}
          systemBarHeight={systemBarHeight}
        ></Simulator>
        <Devtools moving={moving}></Devtools>
      </MainWrapper>
      <FuncDrawer
        className='func-drawer'
        placement='right'
        open={open}
        onClose={() => setOpen(false)}
        contentWrapperStyle={{ height: mainWrapperRef.current?.clientHeight + 'px', top: 'unset' }}
      >
        <FuncTabs />
      </FuncDrawer>
    </PanelWrapper>
  )
}

export default DevtoolsPanel
export type { Device }
