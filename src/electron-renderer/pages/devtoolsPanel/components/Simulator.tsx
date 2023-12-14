import type { Dispatch, ReactElement, RefObject, SetStateAction } from 'react'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Popover, Tooltip } from 'antd'
import { CaretDownOutlined, RightOutlined, MobileOutlined } from '@ant-design/icons'
import { calcWidth } from '@/shared/utils'
import type { RootState } from '@/store'
import type { Device } from '@/pages/devtoolsPanel'
import { ellipsis } from '@/shared/css'
import { changeScale, changeDevice } from '@/store/modules/devtools'
import theme from '@/theme'

const DEFAULT_WIDTH = '50vw'

const SimulatorWrapper = styled.div<{ ref: RefObject<HTMLDivElement>; style: React.CSSProperties }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30vw;
  background-color: ${(props) => props.theme.colorBgContent};
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

  .simulator {
    position: absolute;
    top: 50px;
    left: 50%;
    display: flex;
    flex-direction: column;
    transition: 0.3s all;
    transform-origin: 50% 0;

    .webview {
      flex: 1;
    }
  }
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

const DevicePanel = styled.div`
  border: none;
  border-radius: 7px;
  max-height: 300px;
  overflow-y: auto;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 12px;
    font-size: ${(props) => `${props.theme.contentFontSize}px`};
    cursor: default;

    &:hover {
      background-color: ${(props) => props.theme.colorBgPopupHover};
    }

    &:active,
    &:focus {
      background-color: ${(props) => props.theme.colorBgPopupActive};
    }

    &.selected {
      background-color: ${(props) => props.theme.colorBgPopupActive};
    }
  }
`

const DevicePopover: React.FC<{
  children: ReactElement
  content: ReactElement
  trigger: 'click' | 'hover' | Array<'click' | 'hover'>
  placement: 'top' | 'left' | 'bottomLeft' | 'rightTop'
  align?: object
}> = (props) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Popover
      overlayInnerStyle={{ padding: 0 }}
      trigger={props.trigger}
      placement={props.placement}
      arrow={false}
      autoAdjustOverflow={false}
      open={open}
      align={props.align}
      onOpenChange={(open) => setOpen(open)}
      content={React.cloneElement(props.content, { onClick: () => setOpen(false) })}
    >
      {props.children}
    </Popover>
  )
}

const Simulator: React.FC<{
  minWidth: number | string
  maxWidth: number | string
  moving: boolean
  setMoving: Dispatch<SetStateAction<boolean>>
  devices: Array<Device>
  scaleList: Array<number>
}> = (props) => {
  const [isTouch, setIsTouch] = useState<boolean>(false)
  const simulatorRef = useRef<HTMLDivElement>(null)
  const [simulatorWidth, setSimulatorWidth] = useState<number | string>(DEFAULT_WIDTH)
  const src = useSelector((state: RootState) => state.devtools.src)
  const device = useSelector((state: RootState) => state.devtools.device)
  const scale = useSelector((state: RootState) => state.devtools.scale)
  const dispatch = useDispatch()

  const cascaderData = useMemo(() => {
    return [
      {
        label: '机型',
        value: 'device',
        children: props.devices.map((o) => ({
          label: `${o.title}（${o.screen.vertical.width}x${o.screen.vertical.height}｜Dpr:${o.screen['device-pixel-ratio']}）`,
          value: o.title,
          selected: device.title === o.title,
        })),
      },
      {
        label: '显示比例',
        value: 'scale',
        children: props.scaleList.map((o) => ({ label: `${o * 100}%`, value: o, selected: o === scale })),
      },
    ]
  }, [props.devices, props.scaleList, device, scale])

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      props.setMoving(true)

      const simulatorWidth = simulatorRef.current?.clientWidth

      const minOffset = calcWidth(props.minWidth, window.screen.width)
      const maxOffset = calcWidth(props.maxWidth, window.screen.width)

      const mousemoveHandle = (event: MouseEvent) => {
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
    },
    [props]
  )

  const onChangeDevice = useCallback(
    async (value: Array<string | number>) => {
      const [firstLayer, secondLayer] = value

      if (firstLayer === 'device') {
        const device = props.devices.find((o) => o.title === secondLayer) as Device
        dispatch(changeDevice(device))
        const simulatorWebview = document.querySelector('#simulatorWebview') as ElectronWebViewElement
        const simulatorContentId = simulatorWebview?.getWebContentsId()

        await window.electronAPI.setDeviceMetrics(simulatorContentId, {
          width: device.screen.vertical.width,
          height: device.screen.vertical.height,
          dpr: device.screen['device-pixel-ratio'],
        })
        simulatorWebview.setUserAgent(device['user-agent'])
        simulatorWebview.reload()
      } else {
        dispatch(changeScale(secondLayer as number))
      }
    },
    [props.devices, dispatch]
  )

  return (
    <SimulatorWrapper ref={simulatorRef} style={{ width: simulatorWidth }}>
      <Toolbar>
        <DevicePopover
          trigger='click'
          placement='bottomLeft'
          content={
            <DevicePanel>
              {cascaderData?.map((o) => (
                <DevicePopover
                  placement='rightTop'
                  trigger='hover'
                  key={o.value}
                  align={{ offset: [-5, 0] }}
                  content={
                    <DevicePanel>
                      {o.children.map((child: { label: string; value: string | number; selected: boolean }) => (
                        <div
                          className={`item ${child.selected ? 'selected' : ''}`}
                          key={child.value}
                          onClick={() => onChangeDevice([o.value, child.value])}
                        >
                          {child.label}
                        </div>
                      ))}
                    </DevicePanel>
                  }
                >
                  <div className='item'>
                    {o.label}
                    <RightOutlined style={{ fontSize: 10 }} />
                  </div>
                </DevicePopover>
              ))}
            </DevicePanel>
          }
        >
          <div className='toolbar-item'>
            <span>{device.title}</span>
            <span>{`${scale * 100}%`}</span>
            <CaretDownOutlined />
          </div>
        </DevicePopover>
        <Tooltip title={isTouch ? '切换鼠标模式' : '切换触摸模式'}>
          <MobileOutlined
            style={{
              color: theme.input.colorTextQuaternary,
              fontSize: theme.contentFontSize + 'px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setIsTouch(!isTouch)
              window.electronAPI.send('set-touch-events-for-mouse', { enabled: !isTouch })
            }}
          />
        </Tooltip>
      </Toolbar>
      <SimulatorShell>
        <div
          className='simulator'
          style={{
            width: device.screen.vertical.width,
            height: device.screen.vertical.height,
            transform: `translate(-50%, 0) scale(${scale})`,
          }}
        >
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
            preload={window.electronAPI.simulatorPreload}
            webpreferences='scrollBounce=true'
          ></webview>
        </div>
      </SimulatorShell>
      <SplitLine onMouseDown={onMouseDown} />
    </SimulatorWrapper>
  )
}

export default Simulator
