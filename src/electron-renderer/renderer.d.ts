import { Unsubscribe } from 'conf/dist/source/types'
import { ElementType } from '../electron-main/common'
import actions from '../electron-main/constants/sailerActions'

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }

  interface ElectronWebViewElement extends HTMLElement {
    openDevTools: () => void
    reload: () => void
    getWebContentsId: () => number
    setUserAgent: (userAgent) => void
    getTitle: () => string
  }
}

export interface IElectronAPI {
  send: (channel: string, ...args: any[]) => void
  setDeviceMetrics: (
    simulatorContentId: number,
    device: { width?: number; height?: number; dpr?: number }
  ) => Promise<any>
  simulatorPreload: string
  setUserToken: (userToken: string) => void
  getUserToken: () => string
  onChangeUserToken: (callback: (newValue: any, oldValue: any) => void) => Unsubscribe
  onSailerEvent: (callback: (event: ElementType<typeof actions>, ...args: any) => void) => void
  getSailerMap: () => Record<ElementType<typeof actions>, ElementType<typeof actions>>
}

export type First<T extends any[]> = T extends readonly (infer ElementType)[] ? ElementType : never
