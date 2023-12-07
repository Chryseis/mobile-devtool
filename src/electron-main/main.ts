import path from 'path'
import { app, BrowserWindow, nativeTheme } from 'electron'
import isDev from 'electron-is-dev'
import { createDevtoolsPanel } from './views/devtoolsPanel'

async function createWindow(): Promise<void> {
  nativeTheme.themeSource = 'dark'

  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  })

  await createDevtoolsPanel(win)
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
