import {app, BrowserWindow, ipcMain, IpcMessageEvent, nativeImage, NativeImage } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import * as os from 'os';
import * as child_process from 'child_process';

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  const image = getIconImage();

  win = new BrowserWindow({
    width: 1400,
    // kiosk: true,
    height: 800,
    title: 'NetekTron',
    kiosk: false,
    closable: false,
    minimizable: true,
    icon: image,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    }
  });

  win.setMenu(null);

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/netek/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('hostname', (event, messageFromAngular) => {
  event.sender.send('hostname', os.hostname());
  console.log(os.hostname());
});

ipcMain.on('lockUser', () => {
  child_process.exec('C:\\Windows\\System32\\rundll32.exe user32.dll,LockWorkStation');
});

ipcMain.on('pcInfo', (event) => {
  event.sender.send('pcInfo', {os: os.release(), userName: os.userInfo().username});
});

function getIconImage(): NativeImage {
  const image = nativeImage.createFromPath(path.join(__dirname, `/../../dist/netek/assets/favicon.ico`));
  image.setTemplateImage(true);
  return image;
}
