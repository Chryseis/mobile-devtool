import React, { useEffect } from 'react'
import styled from 'styled-components'
import { LeftOutlined, WifiOutlined } from '@ant-design/icons'
import { ellipsis } from '@/shared/css'

const Wrapper = styled.div<{ style: React.CSSProperties }>`
  position: absolute;
  top: 50px;
  left: 50%;
  display: flex;
  flex-direction: column;
  transition: 0.3s all;
  transform-origin: 50% 0;
  background-color: #fff;

  .system-status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 20px;
    background-color: #fff;
    font-size: 12px;

    .time {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .navigator {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10px;
    height: 44px;
    background-color: #fff;
    box-sizing: border-box;

    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      text-align: center;
      ${ellipsis}
    }
  }
`

const SimulatorOuter: React.FC<{
  style: React.CSSProperties
  children: React.ReactElement
  navigatorHeight: number
  title?: string
}> = ({ children, style, title, navigatorHeight }) => {
  useEffect(() => {
    window.electronAPI.onSailerEvent((event, ...args) => {
      console.log(event, args)
    })
  }, [])

  return (
    <Wrapper style={style}>
      <div className='system-status-bar'>
        <div className='network'>
          cloudr
          <WifiOutlined style={{ marginLeft: 5 }} />
        </div>
        <div className='time'></div>
        <div className='electric-quantity'></div>
      </div>
      <div className='navigator' style={{ height: navigatorHeight }}>
        <div className='left'>
          <LeftOutlined style={{ fontSize: 20 }} />
        </div>
        <div className='title'>{title}</div>
        <div className='right'></div>
      </div>
      {children}
    </Wrapper>
  )
}

export default SimulatorOuter
