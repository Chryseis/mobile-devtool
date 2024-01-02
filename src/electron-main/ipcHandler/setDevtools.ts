import { webContents } from 'electron'
import type { BrowserWindow, WebContents } from 'electron'

export function ipcSetDevtools(win: BrowserWindow, webContentsMap: Map<string, WebContents>) {
  win.webContents.ipc.on(
    'set-devtools',
    async (
      event,
      {
        simulatorContentId,
        devtoolsContentId,
        device,
      }: {
        simulatorContentId: number
        devtoolsContentId: number
        device: { width: number; height: number; dpr: number }
      }
    ) => {
      const simulatorContents = webContents.fromId(simulatorContentId) as WebContents
      const devtoolsContents = webContents.fromId(devtoolsContentId) as WebContents

      if (devtoolsContents) {
        webContentsMap.set('simulatorContents', simulatorContents)
        webContentsMap.set('devtoolsContents', devtoolsContents)
        simulatorContents.setDevToolsWebContents(devtoolsContents)
        simulatorContents.openDevTools({ mode: 'detach' })

        simulatorContents.enableDeviceEmulation({
          screenPosition: 'mobile',
          screenSize: { width: device.width, height: device.height },
          viewPosition: { x: 0, y: 0 },
          deviceScaleFactor: device.dpr,
          viewSize: { width: device.width, height: device.height },
          scale: 1,
        })
      }

      return simulatorContents
    }
  )
}
