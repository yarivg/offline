import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'ng-uikit-pro-standard';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {TableHeadElement} from '../table-head-element.model';

@Component({
  selector: 'app-toggle-columns',
  templateUrl: './toggle-columns.component.html',
  styleUrls: ['./toggle-columns.component.scss']
})
export class ToggleColumnsComponent implements OnInit {

  tableHeadElements: TableHeadElement[];
  form: FormGroup;
  public toggleColumns$: Subject<TableHeadElement[]> = new Subject<TableHeadElement[]>();
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({});
    for (const element of this.tableHeadElements) {
      this.form.addControl(element.index + '', new FormControl(!element.hidden, []));
    }
  }

  resetForm(): void {
    this.initForm();
  }

  applyToggleColumns(): void {
    try {
      this.validateToggleColumns();
      const columns: TableHeadElement [] = [];
      for (let i = 0; i < this.tableHeadElements.length; i++) {
        columns.push(new TableHeadElement(i, this.tableHeadElements[i].description, !this.form.controls[i].value));
      }
      this.toggleColumns$.next(columns);
      this.modalRef.hide();
    } catch (e) {
      console.log(e); //todo: use message service
    }
  }

  private validateToggleColumns(): void {
    let hiddenCounter = 0;
    for (let i = 0; i < this.tableHeadElements.length; i++) {
      if (!this.form.controls[i].value) {
        hiddenCounter += 1;
      }
    }

    if (hiddenCounter === this.tableHeadElements.length) {
      throw new Error('יש לבחור לפחות עמודה אחת');
    }
  }
}
