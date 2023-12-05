import { webContents } from 'electron'
import type { BrowserWindow, WebContents } from 'electron'

export function ipcSetDevtools(win: BrowserWindow) {
  win.webContents.ipc.on('set-devtools', async (event, { simulatorContentId, devtoolsContentId, device }) => {
    const simulatorContents = webContents.fromId(simulatorContentId) as WebContents
    const devtoolsContents = webContents.fromId(devtoolsContentId) as WebContents

    if (devtoolsContents) {
      simulatorContents.setDevToolsWebContents(devtoolsContents)
      simulatorContents.openDevTools({ mode: 'detach' })

      if (!simulatorContents.debugger.isAttached()) {
        simulatorContents.debugger.attach('1.3')
        await simulatorContents.debugger.sendCommand('Emulation.setDeviceMetricsOverride', {
          width: device.screen.vertical.width,
          height: device.screen.vertical.height,
          deviceScaleFactor: device.screen['device-pixel-ratio'], // 缩放因子
          mobile: true,
        })
      }
    }
  })
}
