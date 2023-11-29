import React, { useEffect, useRef, RefObject, useState, Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { calcWidth } from '@/shared/utils'
import { RootState } from '@/store'

const DEFAULT_WIDTH = '50vh'

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
    width: 375px;
    height: 667px;
  }
`

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 27px;
  background-color: ${(props) => props.theme.colorBgToolbar};
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

const Simulator: React.FC<{
  minWidth: number | string
  maxWidth: number | string
  moving: boolean
  setMoving: Dispatch<SetStateAction<boolean>>
}> = (props) => {
  const simulatorRef = useRef<HTMLDivElement>(null)
  const [simulatorWidth, setSimulatorWidth] = useState<number | string>(DEFAULT_WIDTH)
  const src = useSelector((state: RootState) => state.devtools.src)

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

  return (
    <SimulatorWrapper ref={simulatorRef} style={{ width: simulatorWidth }}>
      <Toolbar />
      <SimulatorShell>
        <webview
          id='simulatorWebview'
          className='webview'
          style={{ pointerEvents: props.moving ? 'none' : 'auto' }}
          useragent='Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
          src={src}
        ></webview>
      </SimulatorShell>
      <SplitLine onMouseDown={onMouseDown} />
    </SimulatorWrapper>
  )
}

export default Simulator
