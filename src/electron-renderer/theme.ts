import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  colorPrimary: '#52c41a',
  colorBgBase: '#424242',
  colorBgContent: '#292929',
  colorBgToolbar: '#383838',
  borderRadius: 6,
  fontSize: 14,
  component: {
    colorBgContainer: '#4b4b4b',
    colorBorder: 'rgba(255,255,255,.3)',
    colorText: '#fff',
  },
  input: {
    colorPrimary: '#fff',
    colorPrimaryActive: '#fff',
    colorTextQuaternary: 'rgba(255,255,255,0.65)',
    colorTextTertiary: 'rgba(255,255,255,0.85)',
  },
  select: {
    colorPrimary: '#fff',
    colorPrimaryHover: '#fff',
    colorText: '#fff',
    optionActiveBg: '#4b4b4b',
    optionSelectedBg: '#4b4b4b',
    colorBgElevated: '#333',
    colorTextQuaternary: '#fff',
    colorTextPlaceholder: '#fff',
  },
  icon: {
    colorPrimary: '#fff',
  },
}

export default theme
