import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import emulatedDevices from '@/emulated-devices.json'
import type { Device } from '@/pages/devtoolsPanel'

const initialState: Record<string, any> = {
  protocol: 'http://',
  url: 'capsule-mobile.91jkys.com/mobile.html#/zh-CN/',
  src: 'https://capsule-mobile.91jkys.com/mobile.html#/zh-CN/',
  device: emulatedDevices.find((o) => o.title === 'iPhone 6/7/8') as Device,
  scale: 0.75,
}

export const devtoolsSlice = createSlice({
  name: 'devtools',
  initialState,
  reducers: {
    changeProtocol(state, action: PayloadAction<string>) {
      state.protocol = action.payload
    },
    changeURL(state, action: PayloadAction<string>) {
      state.url = action.payload
    },
    confirmSrc(state) {
      state.src = state.protocol + state.url
    },
    changeDevice(state, action: PayloadAction<Device>) {
      state.device = action.payload
    },
    changeScale(state, action: PayloadAction<number>) {
      state.scale = action.payload
    },
  },
})

export const { changeURL, changeProtocol, confirmSrc, changeDevice, changeScale } = devtoolsSlice.actions

export default devtoolsSlice.reducer
