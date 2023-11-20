import React, { useEffect, useRef, RefObject } from 'react'
import styled from 'styled-components'

const SimulatorWrapper = styled.div<{ ref: RefObject<HTMLDivElement> }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
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

const Simulator: React.FC = () => {
  const simulatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (simulatorRef.current) {
      console.log('simulatorRef', simulatorRef.current)
    }

    return () => {}
  }, [])

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const left: number = e.clientX
    const top: number = e.clientY
  }

  return (
    <SimulatorWrapper ref={simulatorRef}>
      <webview className='webview'></webview>
      <SplitLine onMouseDown={onMouseDown} />
    </SimulatorWrapper>
  )
}

export default Simulator
