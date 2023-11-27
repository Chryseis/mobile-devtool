import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { IStyledComponent, useTheme } from 'styled-components'
import { Avatar, Input, Select } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import avatar from '@/assets/images/avatar.jpeg'
import { RootState } from '@/store'
import { changeURL } from '@/store/modules/devtools'

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

  const [protocol, setProtocol] = useState<string>('http://')

  const url = useSelector((state: RootState) => state.devtools.url)

  const dispatch = useDispatch()

  return (
    <HeaderWrapper>
      <Avatar className='avatar' shape='square' src={avatar} />
      <FunctionBar>
        <Input
          addonBefore={
            <Select value={protocol} onChange={(value) => setProtocol(value)}>
              <Select.Option value='http://'>http://</Select.Option>
              <Select.Option value='https://'>https://</Select.Option>
            </Select>
          }
          addonAfter={<ReloadOutlined style={{ color: theme.icon.colorPrimary }} />}
          className='search'
          allowClear
          value={url}
          onChange={(e) => dispatch(changeURL(e.target.value))}
        />
      </FunctionBar>
    </HeaderWrapper>
  )
}

export default Header
