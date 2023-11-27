import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  protocol: '',
  url: '',
}

export const devtoolsSlice = createSlice({
  name: 'devtools',
  initialState,
  reducers: {
    changeProtocol(state, action: PayloadAction<string>) {
      state.protocol = action.payload
    },
    changeURL(state, action: PayloadAction<string>) {
      console.log('payload', action.payload)
      state.url = action.payload
    },
  },
})

export const { changeURL } = devtoolsSlice.actions

export default devtoolsSlice.reducer
