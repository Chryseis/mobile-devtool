import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: Record<string, any> = {
  protocol: 'http://',
  url: 'capsule-mobile.91jkys.com/mobile.html#/zh-CN/',
  src: 'https://capsule-mobile.91jkys.com/mobile.html#/zh-CN/',
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
  },
})

export const { changeURL, changeProtocol, confirmSrc } = devtoolsSlice.actions

export default devtoolsSlice.reducer
