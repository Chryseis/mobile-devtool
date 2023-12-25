import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form, Descriptions, Input, Space, Divider, Button } from 'antd'

const LoginWrapper = styled.div``

const Login: React.FC = () => {
  const [userToken, setUserToken] = useState<string>('')

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log(values)
  }

  useEffect(() => {
    window.electronAPI.onChangeUserToken((newValue) => {
      setUserToken(newValue)
    })
  }, [])

  return (
    <LoginWrapper>
      <Descriptions bordered>
        <Descriptions.Item label='user_token'>
          <Space.Compact style={{ width: '100%' }}>
            <Input value={userToken} onChange={(e) => setUserToken(e.target.value)} placeholder='请输入' allowClear />
          </Space.Compact>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form form={form} onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Form.Item label='用户' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder='请输入' allowClear />
        </Form.Item>
        <Form.Item label='密码' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input placeholder='请输入' type='password' allowClear />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  )
}

export default Login
