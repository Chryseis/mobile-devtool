import { ipcHandleSailerAliPay } from './aliPay'
import { ipcHandleSailerCallLogin } from './callLogin'
import { ipcHandleSailerCallLogout } from './callLogout'
import { ipcHandleSailerCallPhone } from './callPhone'
import { ipcHandleSailerCopyWord } from './copyWord'
import { ipcHandleSailerUploadAvatar } from './uploadAvatar'
import { ipcHandleSailerWaitForAnswer } from './waitForAnswer'
import { ipcHandleSailerOpen } from './open'

export function ipcHandleSailer() {
  ipcHandleSailerAliPay()
  ipcHandleSailerCallLogin()
  ipcHandleSailerCallLogout()
  ipcHandleSailerCallPhone()
  ipcHandleSailerCopyWord()
  ipcHandleSailerUploadAvatar()
  ipcHandleSailerWaitForAnswer()
  ipcHandleSailerOpen()
}
