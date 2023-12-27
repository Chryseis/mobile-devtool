import { ipcHandleSailerAliPay } from './aliPay';
import { ipcHandleSailerCallLogin } from './callLogin';
import { ipcHandleSailerCallLogout } from './callLogout';
export function ipcHandleSailer() {
  ipcHandleSailerAliPay();
  ipcHandleSailerCallLogin();
  ipcHandleSailerCallLogout();
}