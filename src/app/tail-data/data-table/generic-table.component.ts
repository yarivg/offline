import {DataTableComponent} from './data-table.component';
import {ViewChild} from '@angular/core';

export class GenericTableComponent {
  @ViewChild('dataTable', {static: true}) dataTable: DataTableComponent;
  elements: any[] = [];

  searchText(searchText: string): void {
    const prev = this.dataTable.mdbTable.getDataSource();
    if (!searchText) {
      this.dataTable.mdbTable.setDataSource(this.dataTable.previous);
      this.elements =
        this.dataTable.mdbTable.getDataSource();
    }
    if (searchText) {
      this.elements =
        this.dataTable.mdbTable.searchLocalDataBy(searchText);
      this.dataTable.mdbTable.setDataSource(prev);
    }
  }
}
