import type { BrowserWindow } from 'electron'
import actions, { callbackType } from '@/constants/sailerActions'
import type { ElementType } from '@/common'

const event: ElementType<typeof actions> = 'open'

export function ipcHandleSailerOpen(win: BrowserWindow) {
  win.webContents.ipc.on(event, async (e, ...args: any[]) => {
    const callbackId = args[0]
    const params = args[1]
    win.webContents.send(event, { type: callbackType.SUCCESS, callbackId, result: { ok: false, message: 'todo' } })
  })
}
