import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class AppElectronService {

  constructor(private electronService: ElectronService) {
  }

  launchWindow(): void {
    if (this.electronService.isElectronApp) {
      this.electronService.shell.openExternal('https://rsinnotech.com');
    }
  }

  showHostname(): void {
    alert(this.electronService.ipcRenderer);
    this.electronService.ipcRenderer.on('hostname', (event, args) => {
      alert(args);
    });
    this.electronService.ipcRenderer.send('hostname', []);
  }

  openCalculator(): void {
    // this.electronService.shell.openItem('C:\\Windows\\System32\\calc.exe');
  }

  lockUser(): void {
    this.electronService.ipcRenderer.send('lockUser', []);
  }

  showPcInfo(): void {
    this.electronService.ipcRenderer.on('pcInfo', (event, args) => {
      alert('Windows ' + args.os + '\nUser: ' + args.userName);
    });
    this.electronService.ipcRenderer.send('pcInfo', []);
  }
}
