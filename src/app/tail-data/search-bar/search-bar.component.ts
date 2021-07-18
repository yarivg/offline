import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() tailNumber = 'זנב 123';
  @Input() squad = 'טייסת 101';
  @Input() workCenter = 'דת"ק 11';
  @Output() searchText$: EventEmitter<string> = new EventEmitter<string>()
  searchText = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  @HostListener('input') oninput() {
    this.searchText$.emit(this.searchText);
  }

}
