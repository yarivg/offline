import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent, ToastService} from 'ng-uikit-pro-standard';
import {IdbService} from './services/idb.service';
import {ExcelService} from './services/excel.service';
import {WebSocketService} from './services/web-socket.service';
import {AppElectronService} from './services/app-electron.service';
declare var $: any;

export interface User {
  id: string;
  first: string;
  last: string;
  handle: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sample App';
  hide = false;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: User[] = [];
  previous: User[] = [];
  headElements = ['ID', 'First', 'Last', 'Handle'];

  constructor(private cdRef: ChangeDetectorRef,
              private idbService: IdbService,
              private excelService: ExcelService,
              private toastService: ToastService,
              private webSocketService: WebSocketService,
              private appElectronService: AppElectronService) {
    // this.idbService.connectToIDB();
  }

  ngOnInit() {
    this.appElectronService.showHostname();
    // this.webSocketService.connect();
    // this.webSocketService.messageSubject.subscribe(message => {
    //   this.toastService.success(message);
    // });
    // for (let i = 1; i <= 15; i++) {
    //   const user: User = {id: i.toString(), first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i};
    //   this.elements.push(user);
    //   this.idbService.addItem('Users', user);
    // }
    //
    // this.idbService.getAllData('Users').subscribe(data => {
    //   console.log(data);
    // });
    //
    // this.mdbTable.setDataSource(this.elements);
    // this.elements = this.mdbTable.getDataSource();
    // this.previous = this.mdbTable.getDataSource();
  }


  showHide(): void {
    this.hide = !this.hide;
    if (this.hide) {
      const index = this.headElements.indexOf('Handle');
      this.headElements.splice(index, 1);
    } else {
      this.headElements.splice(3, 0, 'Handle');
    }
  }

  export(): void {
    this.excelService.exportAsExcelFile(this.elements, 'sample');
  }

  sendHelloWorldMessage(): void {
    this.webSocketService.send('Hello World');
  }
}
