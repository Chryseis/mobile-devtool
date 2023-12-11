import type { BrowserWindow, WebContents } from 'electron'

export function ipcSetTouchEventsForMouse(win: BrowserWindow, webContentsMap: Map<string, WebContents>) {
  win.webContents.ipc.on('set-touch-events-for-mouse', async (e, { enabled }) => {
    const simulatorContents = webContentsMap.get('simulatorContents') as WebContents
    if (!simulatorContents?.debugger.isAttached()) {
      simulatorContents.debugger.attach('1.3')
    }

    await simulatorContents?.debugger.sendCommand('Emulation.setEmitTouchEventsForMouse', {
      enabled,
      configuration: 'mobile',
    })
  })
}
