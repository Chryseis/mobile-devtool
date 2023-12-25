import React from 'react'
import styled from 'styled-components'
import { Tabs, TabsProps } from 'antd'
import Login from './components/Login'

const TabsWrapper = styled(Tabs)`
  &:before {
    display: none;
  }
`

const items: TabsProps['items'] = [
  {
    key: 'login',
    label: '模拟用户登录',
    children: <Login />,
  },
  {
    key: 'idCard',
    label: '身份证生成',
    children: 'Content of Tab Pane 2',
  },
]

const FuncTabs: React.FC = () => {
  return <TabsWrapper items={items} />
}

export default FuncTabs
