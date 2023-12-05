import path from 'path'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, ...args: any[]): void => ipcRenderer.send(channel, ...args),
  setDeviceMetrics: (simulatorContentId: number, metrics: { width?: number; height?: number; dpr?: number }) =>
    ipcRenderer.send('set-device-metrics', { simulatorContentId, metrics }),
  simulatorPreload: `file://${path.join(__dirname, 'preload-simulator.js')}`,
})
