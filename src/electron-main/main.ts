import path from 'path'
import { app, BrowserWindow, webContents, nativeTheme } from 'electron'
import type { WebContents } from 'electron'
import isDev from 'electron-is-dev'

async function createWindow(): Promise<void> {
  nativeTheme.themeSource = 'dark'

  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
    },
  })

  // and load the index.html of the app.
  // win.loadFile("index.html");
  await win.loadURL(
    isDev ? 'http://localhost:3000/#devtoolsPanel' : `file://${path.join(__dirname, '../build/index.html')}`
  )
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }

  win.webContents.ipc.on('set-devtools', (event, { simulatorContentId, devtoolsContentId }) => {
    const simulatorContents = webContents.fromId(simulatorContentId) as WebContents
    const devtoolsContents = webContents.fromId(devtoolsContentId) as WebContents

    if (devtoolsContents) {
      simulatorContents.setDevToolsWebContents(devtoolsContents)
      simulatorContents.openDevTools({ mode: 'detach' })

      if (!simulatorContents.debugger.isAttached()) {
        simulatorContents.debugger.attach('1.3')
        simulatorContents.debugger.sendCommand('Emulation.setDeviceMetricsOverride', {
          width: 300, // 你可以设置手机视图的宽度
          height: 667, // 你可以设置手机视图的高度
          deviceScaleFactor: 2, // 缩放因子
          mobile: true,
        })
      }
    }
  })

  win.webContents.ipc.on('set-device-metrics', (e, metrics) => {})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow()
  }
})
