import React, { useEffect, useRef, RefObject, useState, Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { calcWidth } from '@/shared/utils'
import { RootState } from '@/store'

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
      <webview
        id='simulatorWebview'
        className='webview'
        style={{ pointerEvents: props.moving ? 'none' : 'auto' }}
        useragent='Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
        src={src}
      ></webview>
      <SplitLine onMouseDown={onMouseDown} />
    </SimulatorWrapper>
  )
}

export default Simulator
