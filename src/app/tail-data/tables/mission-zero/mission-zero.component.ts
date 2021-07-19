import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableComponent} from '../../data-table/data-table.component';
import {GenericTableComponent} from '../../data-table/generic-table.component';

@Component({
  selector: 'app-mission-zero',
  templateUrl: './mission-zero.component.html',
  styleUrls: ['./mission-zero.component.scss']
})
export class MissionZeroComponent extends GenericTableComponent implements OnInit {
  headElements: string [] = ['שם', 'גיל', 'עיר', 'חיה אהובה', 'מאכל אהוב', 'שפה אהובה', 'אלגוריתם אהוב'
    , 'משכורת ראויה'];

  title = 'האקתון';

  @ViewChild('dataTable', {static: true}) dataTable: DataTableComponent;

  constructor() {
    super();
    for (let i = 0; i < 15; i++) {
      const data = {id: i.toString(), first: '7-131-99' + i, last: 'Name ' + i, handle: 'Handle ' + i};
      this.elements.push(data);
    }
  }

  ngOnInit(): void {
  }
}
