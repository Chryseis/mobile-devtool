import { configureStore } from '@reduxjs/toolkit'
import devtools from './modules/devtools'

export const store = configureStore({
  reducer: {
    devtools,
  },
})

export type RootState = ReturnType<typeof store.getState>
