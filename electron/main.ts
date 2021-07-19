import {app, Tray, BrowserWindow, ipcMain, nativeImage, NativeImage, Menu} from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as os from 'os';
import * as child_process from 'child_process';

let win: BrowserWindow;
let tray = null;

app.on('ready', initialize);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function initialize() {
  createWindow();
  createTray();
}

function ignoreQuitting(event: Event) {
  event.preventDefault();
  win.minimize();
  win.setSkipTaskbar(true);
}

function reopenApp() {
  win.focus();
  win.setSkipTaskbar(false);
}

function createTray() {
  tray = new Tray(path.join(__dirname, `/../../dist/netek/assets/offline.jpg`));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'פתיחת נתק',
      click: () => {
        reopenApp();
      }
    }
  ]);
  tray.setContextMenu(contextMenu);
}

function createWindow() {
  const image = getIconImage();

  win = new BrowserWindow({
    width: 1400,
    height: 800,
    title: 'NetekTron',
    kiosk: false,
    closable: false,
    minimizable: true,
    icon: image,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  win.on('close', (event) => ignoreQuitting(event));

  win.setMenu(null);

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/netek/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

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
