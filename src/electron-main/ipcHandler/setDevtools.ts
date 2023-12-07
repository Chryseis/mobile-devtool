import { webContents } from 'electron'
import type { BrowserWindow, WebContents } from 'electron'

export function ipcSetDevtools(win: BrowserWindow, webContentsMap: Map<string, WebContents>) {
  win.webContents.ipc.on('set-devtools', async (event, { simulatorContentId, devtoolsContentId, device }) => {
    const simulatorContents = webContents.fromId(simulatorContentId) as WebContents
    const devtoolsContents = webContents.fromId(devtoolsContentId) as WebContents

    if (devtoolsContents) {
      webContentsMap.set('simulatorContents', simulatorContents)
      webContentsMap.set('devtoolsContents', devtoolsContents)
      simulatorContents.setDevToolsWebContents(devtoolsContents)
      simulatorContents.openDevTools()

      simulatorContents.enableDeviceEmulation({
        screenPosition: 'mobile',
        screenSize: { width: device.screen.vertical.width, height: device.screen.vertical.height },
        viewPosition: { x: 0, y: 0 },
        deviceScaleFactor: device.screen['device-pixel-ratio'],
        viewSize: { width: device.screen.vertical.width, height: device.screen.vertical.height },
        scale: 1,
      })

      // if (!simulatorContents.debugger.isAttached()) {
      //   simulatorContents.debugger.attach('1.3')
      //
      //   await simulatorContents.debugger.sendCommand('Emulation.setEmitTouchEventsForMouse', {
      //     enabled: false,
      //     configuration: 'mobile',
      //   })
      // }
    }
  })
}
