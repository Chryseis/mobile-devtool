import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import GlobalStyle from '@/components/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { ConfigProvider } from 'antd'
import theme from './theme'

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.colorPrimary,
          },
          components: {
            Input: {
              ...theme.component,
              ...theme.input,
            },
            Select: {
              ...theme.component,
              ...theme.select,
            },
            Button: {
              ...theme.component,
              ...theme.button,
            },
            Tooltip: {
              ...theme.component,
              ...theme.tooltip,
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </ThemeProvider>
  )
}

export default App
