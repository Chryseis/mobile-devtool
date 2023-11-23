import React, { useEffect, useRef, RefObject, useState } from 'react'
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

const Simulator: React.FC<{ minWidth: number | string; maxWidth: number | string }> = (props) => {
  const simulatorRef = useRef<HTMLDivElement>(null)
  const [simulatorWidth, setSimulatorWidth] = useState<number | string>('30vw')

  useEffect(() => {
    if (simulatorRef.current) {
      setSimulatorWidth(simulatorRef.current.clientWidth)
    }

    return () => {}
  }, [])

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX: number = e.clientX

    const simulatorWidth = simulatorRef.current?.clientWidth

    const minOffset = calcWidth(props.minWidth, window.screen.width)
    const maxOffset = calcWidth(props.maxWidth, window.screen.width)

    window.addEventListener('mousemove', (event: MouseEvent) => {
      const x = event.clientX

      const deltaOffset = x - startX

      if (simulatorWidth) {
        const clientWidth = simulatorWidth + deltaOffset
        setSimulatorWidth(clientWidth)
      }
    })
  }

  return (
    <SimulatorWrapper ref={simulatorRef} style={{ width: simulatorWidth }}>
      <webview className='webview'></webview>
      <SplitLine onMouseDown={onMouseDown} />
    </SimulatorWrapper>
  )
}

export default Simulator
