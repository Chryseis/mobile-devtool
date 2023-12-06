import { webContents } from 'electron'
import type { BrowserWindow, WebContents } from 'electron'

export function ipcSetDevtools(win: BrowserWindow) {
  win.webContents.ipc.on('set-devtools', async (event, { simulatorContentId, devtoolsContentId, device }) => {
    const simulatorContents = webContents.fromId(simulatorContentId) as WebContents
    const devtoolsContents = webContents.fromId(devtoolsContentId) as WebContents

    if (devtoolsContents) {
      simulatorContents.setDevToolsWebContents(devtoolsContents)
      simulatorContents.openDevTools()

      if (!simulatorContents.debugger.isAttached()) {
        simulatorContents.debugger.attach('1.3')
        await simulatorContents.debugger.sendCommand('Emulation.setDeviceMetricsOverride', {
          width: device.screen.vertical.width,
          height: device.screen.vertical.height,
          deviceScaleFactor: device.screen['device-pixel-ratio'],
          mobile: true,
        })

        // await simulatorContents.debugger.sendCommand('Emulation.setTouchEmulationEnabled', {
        //   enabled: true,
        //   maxTouchPoints: 1,
        // })
        //
        // await simulatorContents.debugger.sendCommand('Emulation.setEmitTouchEventsForMouse', {
        //   enabled: true,
        //   configuration: 'mobile',
        // })
      }
    }
  })
}
