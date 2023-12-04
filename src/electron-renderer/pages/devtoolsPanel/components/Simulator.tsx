import type { Dispatch, RefObject, SetStateAction } from 'react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { CascaderProps, Popover, Cascader } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { calcWidth } from '@/shared/utils'
import type { RootState } from '@/store'
import type { Device } from '@/pages/devtoolsPanel'
import { ellipsis } from '@/shared/css'
import { changeScale, changeDevice } from '@/store/modules/devtools'

const DEFAULT_WIDTH = '50vw'

const SimulatorWrapper = styled.div<{ ref: RefObject<HTMLDivElement>; style: React.CSSProperties }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30vw;
  background-color: ${(props) => props.theme.colorBgContent};

  .webview {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 27px;
  background-color: ${(props) => props.theme.colorBgToolbar};

  .toolbar-item {
    display: flex;
    gap: 6px;
    font-size: ${(props) => props.theme.contentFontSize + 'px'};
    color: ${(props) => props.theme.colorText};
    ${ellipsis};
    cursor: pointer;
  }
`

const SimulatorShell = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
`

const SplitLine = styled.div`
  position: absolute;
  width: 10px;
  height: 100%;
  top: 0;
  right: 0;
  transform: translate(50%, 0);
  cursor: col-resize;
`

const DevicePanel = styled(Cascader.Panel)`
  border: none;
  max-height: 300px;
  overflow-y: auto;
`

const Simulator: React.FC<{
  minWidth: number | string
  maxWidth: number | string
  moving: boolean
  setMoving: Dispatch<SetStateAction<boolean>>
  devices: Array<Device>
  scaleList: Array<number>
}> = (props) => {
  const simulatorRef = useRef<HTMLDivElement>(null)
  const [simulatorWidth, setSimulatorWidth] = useState<number | string>(DEFAULT_WIDTH)
  const [open, setOpen] = useState<boolean>(false)
  const src = useSelector((state: RootState) => state.devtools.src)
  const device = useSelector((state: RootState) => state.devtools.device)
  const scale = useSelector((state: RootState) => state.devtools.scale)
  const dispatch = useDispatch()

  const cascaderData = useMemo<CascaderProps['options']>(() => {
    return [
      {
        label: '机型',
        value: 'device',
        children: props.devices.map((o) => ({
          label: `${o.title}（${o.screen.vertical.width}x${o.screen.vertical.height}｜Dpr:${o.screen['device-pixel-ratio']}）`,
          value: o.title,
        })),
      },
      {
        label: '显示比例',
        value: 'scale',
        children: props.scaleList.map((o) => ({ label: `${o * 100}%`, value: o })),
      },
    ] as CascaderProps['options']
  }, [props.devices, props.scaleList])

  useEffect(() => {
    if (simulatorRef.current) {
      setSimulatorWidth(simulatorRef.current.clientWidth)
    }

    return () => {}
  }, [])

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const simulatorWidth = simulatorRef.current?.clientWidth

    const minOffset = calcWidth(props.minWidth, window.screen.width)
    const maxOffset = calcWidth(props.maxWidth, window.screen.width)

    const mousemoveHandle = (event: MouseEvent) => {
      props.setMoving(true)
      const x = event.clientX

      if (simulatorWidth) {
        if (x < minOffset) {
          setSimulatorWidth(minOffset)
        } else if (x > maxOffset) {
          setSimulatorWidth(maxOffset)
        } else {
          setSimulatorWidth(x)
        }
      }
    }

    const mouseupHandle = () => {
      props.setMoving(false)
      document?.removeEventListener('mousemove', mousemoveHandle)
      document?.removeEventListener('mouseup', mouseupHandle)
    }

    document?.addEventListener('mousemove', mousemoveHandle)
    document?.addEventListener('mouseup', mouseupHandle)
  }

  const onChangeDevice = (value: Array<string | number>) => {
    const [menu1, menu2] = value

    if (menu1 === 'device') {
      const device = props.devices.find((o) => o.title === menu2) as Device
      dispatch(changeDevice(device))
    } else {
      dispatch(changeScale(menu2 as number))
    }

    setOpen(false)
  }

  return (
    <SimulatorWrapper ref={simulatorRef} style={{ width: simulatorWidth }}>
      <Toolbar>
        <Popover
          overlayInnerStyle={{ padding: 0 }}
          trigger='click'
          arrow={false}
          open={open}
          onOpenChange={(open) => setOpen(open)}
          content={
            <DevicePanel
              options={cascaderData}
              expandTrigger='hover'
              onChange={(value: any) => onChangeDevice(value)}
            />
          }
        >
          <div className='toolbar-item'>
            <span>{device.title}</span>
            <span>{`${scale * 100}%`}</span>
            <CaretDownOutlined />
          </div>
        </Popover>
      </Toolbar>
      <SimulatorShell>
        <webview
          id='simulatorWebview'
          className='webview'
          style={{
            pointerEvents: props.moving ? 'none' : 'auto',
            width: device.screen.vertical.width,
            height: device.screen.vertical.height,
          }}
          useragent={device['user-agent']}
          src={src}
        ></webview>
      </SimulatorShell>
      <SplitLine onMouseDown={onMouseDown} />
    </SimulatorWrapper>
  )
}

export default Simulator
