import React from 'react'
import styled, { IStyledComponent, useTheme } from 'styled-components'
import { Avatar, Input, Select } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import avatar from '@/assets/images/avatar.jpeg'

const FunctionBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  .search {
    width: 60%;
    height: 30px;
  }
`

const HeaderWrapper: IStyledComponent<'web'> = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 12px;
  height: 80px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colorBgBase};

  .avatar {
    margin-right: 10px;
  }
`

const Header: React.FC = () => {
  const theme = useTheme()

  return (
    <HeaderWrapper>
      <Avatar className='avatar' shape='square' src={avatar} />
      <FunctionBar>
        <Input
          addonBefore={
            <Select defaultValue='http://'>
              <Select.Option value='http://'>http://</Select.Option>
              <Select.Option value='https://'>https://</Select.Option>
            </Select>
          }
          addonAfter={<ReloadOutlined style={{ color: theme.icon.colorPrimary }} />}
          className='search'
          allowClear
        />
      </FunctionBar>
    </HeaderWrapper>
  )
}

export default Header
