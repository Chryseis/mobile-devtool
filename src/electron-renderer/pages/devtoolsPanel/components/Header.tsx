import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { useTheme } from 'styled-components'
import type { IStyledComponent } from 'styled-components'
import { Avatar, Input, Select } from 'antd'
import type { InputRef } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import avatar from '@/assets/images/avatar.jpeg'
import type { RootState } from '@/store'
import { changeProtocol, changeURL, confirmSrc } from '@/store/modules/devtools'

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

const Header: React.FC<{ reloadSimulator: () => void }> = (props) => {
  const inputRef = useRef<InputRef>(null)

  const theme = useTheme()

  const protocol = useSelector((state: RootState) => state.devtools.protocol)

  const url = useSelector((state: RootState) => state.devtools.url)

  const dispatch = useDispatch()

  return (
    <HeaderWrapper>
      <Avatar className='avatar' shape='square' src={avatar} />
      <FunctionBar>
        <Input
          ref={inputRef}
          addonBefore={
            <Select value={protocol} onChange={(val) => dispatch(changeProtocol(val))}>
              <Select.Option value='http://'>http://</Select.Option>
              <Select.Option value='https://'>https://</Select.Option>
            </Select>
          }
          addonAfter={<ReloadOutlined style={{ color: theme.icon.colorPrimary }} onClick={props.reloadSimulator} />}
          className='search'
          allowClear
          value={url}
          onChange={(e) => dispatch(changeURL(e.target.value))}
          onPressEnter={() => {
            inputRef.current?.blur()
            dispatch(confirmSrc())
          }}
        />
      </FunctionBar>
    </HeaderWrapper>
  )
}

export default Header
