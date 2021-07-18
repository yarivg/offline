import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild, EventEmitter,
  Input,
  OnInit, Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'ng-uikit-pro-standard';
import {ExcelService} from '../../services/excel.service';
import {ToggleColumnsComponent} from './toggle-columns/toggle-columns.component';
import {TableHeadElement} from './table-head-element.model';

interface Foo {
  [key: string]: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @Input() title = 'פ"מ 0';
  @Input() headElements: string [] = [];
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective
  @ContentChild(TemplateRef) templateRef;
  @Input() elements: any[] = [];
  @Output() searchText$: EventEmitter<string> = new EventEmitter<string>();
  previous: any[] = [];
  tableHeadElements: TableHeadElement[] = [];


  constructor(private cdRef: ChangeDetectorRef,
              private excelService: ExcelService,
              private modalService: MDBModalService) {
  }

  ngOnInit() {
    for (let i = 0; i < this.headElements.length; i++) {
      this.tableHeadElements.push(new TableHeadElement(i, this.headElements[i], false));
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  toggleColumns(): void {
    const modalOptions = {
      backdrop: true,
      class: 'modal-notify modal-info modal-side modal-top-left modal-dialog',
      ignoreBackdropClick: false,
      data: {
        tableHeadElements: this.tableHeadElements
      }
    }

    const modalRef = this.modalService.show(ToggleColumnsComponent, modalOptions);
    modalRef.content.toggleColumns$.subscribe(columns => this.tableHeadElements = columns);
  }

  shouldBeHidden(index: number): boolean {
    return this.tableHeadElements[index].hidden;
  }

  exportExcel(): void {
    const exportData: any = [];
    let values = [];
    for (let i = 0; i < this.elements.length; i++) {
      const m: Map<string, string> = new Map<string, string>();
      values = Object.values(this.elements[i]);
      m.set('', i + '');
      for (let j = 0; j < this.headElements.length; j++) {
        if (!this.tableHeadElements[j].hidden) {
          m.set(this.headElements[j], values[j]);
        }
      }
      exportData.push(this.convertMapToJson(m));
    }
    this.excelService.exportAsExcelFile(exportData, this.title);
  }

  private convertMapToJson(m: Map<string, string>): Object {
    let jsonResponse = {};
    for (let [key, val] of m) {
      jsonResponse[key] = val;
    }
    return jsonResponse;
  }

  searchText(searchText: string): void {
    this.searchText$.emit(searchText);
  }
}
