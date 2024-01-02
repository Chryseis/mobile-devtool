import path from 'path'
import { contextBridge, ipcRenderer } from 'electron'
import store from './store'
import { ElementType } from '@/common'
import actions from '@/constants/sailerActions'

const webContentId = ipcRenderer.sendSync('get-web-contentId')

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, ...args: any[]): void => ipcRenderer.send(channel, ...args),
  setDeviceMetrics: (simulatorContentId: number, device: { width?: number; height?: number; dpr?: number }) =>
    ipcRenderer.invoke('set-device-metrics', { simulatorContentId, device }),
  simulatorPreload: `file://${path.join(__dirname, 'preload-simulator.js')}`,
  setUserToken: (userToken: string) => store.set(`${webContentId}.userToken`, userToken),
  getUserToken: () => store.get(`${webContentId}.userToken`),
  onChangeUserToken: (callback: (newValue?: any, oldValue?: any) => void) =>
    store.onDidChange(`${webContentId}.userToken`, callback),
  onSailerEvent(callback: (event: ElementType<typeof actions>, ...args: any) => void) {
    ipcRenderer.on('sailer-event', (e, args) => callback(args))
  },
  getSailerMap: () =>
    actions.reduce((result, action) => {
      return { ...result, [action]: action }
    }, {}),
})
