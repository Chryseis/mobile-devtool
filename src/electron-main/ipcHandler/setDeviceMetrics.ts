import { webContents } from 'electron'
import type { BrowserWindow, WebContents } from 'electron'

export function ipcSetDeviceMetrics(win: BrowserWindow) {
  win.webContents.ipc.handle(
    'set-device-metrics',
    async (
      e,
      {
        simulatorContentId,
        device,
      }: { simulatorContentId: number; device: { width: number; height: number; dpr: number } }
    ) => {
      const simulatorContents = webContents.fromId(simulatorContentId) as WebContents

      simulatorContents.enableDeviceEmulation({
        screenPosition: 'mobile',
        screenSize: { width: device.width, height: device.height },
        viewPosition: { x: 0, y: 0 },
        deviceScaleFactor: device.dpr,
        viewSize: { width: device.width, height: device.height },
        scale: 1,
      })
    }
  )
}
