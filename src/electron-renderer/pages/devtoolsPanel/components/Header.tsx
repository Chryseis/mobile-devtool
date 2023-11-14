import React from 'react'
import styled, { IStyledComponent } from 'styled-components'
import { Avatar, Input } from 'antd'
import avatar from '@/assets/images/avatar.png'

const FunctionBar: IStyledComponent<'web'> = styled.div`
  display: flex;
  align-items: center;

  .search {
    width: 500px;
    height: 30px;
  }
`

const HeaderWrapper: IStyledComponent<'web'> = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 12px;
  height: 80px;
  box-sizing: border-box;

  .avatar {
    margin-right: 10px;
  }
`

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Avatar className='avatar' shape='square' src={avatar} />
      <FunctionBar>
        <Input className='search' allowClear />
      </FunctionBar>
    </HeaderWrapper>
  )
}

export default Header
