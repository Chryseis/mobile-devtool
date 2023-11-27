import React, { useEffect, useRef, RefObject, useState, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { calcWidth } from '@/shared/utils'

const SimulatorWrapper = styled.div<{ ref: RefObject<HTMLDivElement>; style: React.CSSProperties }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30vw;
  background-color: ${(props) => props.theme.colorBgContent};

  .webview {
    flex: 1;
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

const Simulator: React.FC<{
  minWidth: number | string
  maxWidth: number | string
  moving: boolean
  setMoving: Dispatch<SetStateAction<boolean>>
}> = (props) => {
  const simulatorRef = useRef<HTMLDivElement>(null)
  const [simulatorWidth, setSimulatorWidth] = useState<number | string>('30vw')

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
      <webview id='webview' className='webview' style={{ pointerEvents: props.moving ? 'none' : 'auto' }}></webview>
      <SplitLine onMouseDown={onMouseDown} />
    </SimulatorWrapper>
  )
}

export default Simulator
