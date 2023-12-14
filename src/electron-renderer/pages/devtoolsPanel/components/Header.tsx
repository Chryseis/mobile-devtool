import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { useTheme } from 'styled-components'
import type { IStyledComponent } from 'styled-components'
import { Avatar, Input, Select, Button, Popover, QRCode } from 'antd'
import type { InputRef } from 'antd'
import { ReloadOutlined, QrcodeOutlined, MenuOutlined } from '@ant-design/icons'
import avatar from '@/assets/images/avatar.jpeg'
import type { RootState } from '@/store'
import { changeProtocol, changeURL, confirmSrc } from '@/store/modules/devtools'

const QRText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  font-size: ${(props) => props.theme.contentFontSize}px;
`

const FunctionBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .search {
    width: 60%;
    height: 30px;
  }

  .action-bar {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-right: 20px;
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

const Header: React.FC<{ reloadSimulator: () => void; isLoading: boolean }> = (props) => {
  const inputRef = useRef<InputRef>(null)

  const theme = useTheme()

  const protocol = useSelector((state: RootState) => state.devtools.protocol)

  const url = useSelector((state: RootState) => state.devtools.url)

  const src = useSelector((state: RootState) => state.devtools.src)

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
          addonAfter={
            <ReloadOutlined
              style={{ color: theme.icon.colorPrimary }}
              spin={props.isLoading}
              onClick={props.reloadSimulator}
            />
          }
          className='search'
          allowClear
          value={url}
          onChange={(e) => dispatch(changeURL(e.target.value))}
          onPressEnter={() => {
            inputRef.current?.blur()
            dispatch(confirmSrc())
          }}
        />
        <div className='action-bar'>
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            placement='bottom'
            trigger='click'
            content={
              <>
                <QRText>当前页面二维码</QRText>
                <QRCode value={src} bordered={false} />
              </>
            }
          >
            <Button type='primary' icon={<QrcodeOutlined />} />
          </Popover>
          <Button type='primary' icon={<MenuOutlined />} />
        </div>
      </FunctionBar>
    </HeaderWrapper>
  )
}

export default Header
