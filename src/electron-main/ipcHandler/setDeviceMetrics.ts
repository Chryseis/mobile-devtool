import { webContents } from 'electron'
import type { BrowserWindow, WebContents } from 'electron'

export function ipcSetDeviceMetrics(win: BrowserWindow) {
  win.webContents.ipc.on(
    'set-device-metrics',
    async (
      e,
      {
        simulatorContentId,
        device,
      }: { simulatorContentId: number; device: { width: number; height: number; dpr: number } }
    ) => {
      const simulatorContents = webContents.fromId(simulatorContentId) as WebContents

      if (simulatorContents.debugger.isAttached()) {
        await simulatorContents.debugger.sendCommand('Emulation.setDeviceMetricsOverride', {
          width: device.width,
          height: device.height,
          deviceScaleFactor: device.dpr,
          mobile: true,
        })
      }
    }
  )
}
