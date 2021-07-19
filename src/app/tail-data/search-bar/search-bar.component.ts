import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() tailNumber = 'אופק';
  @Input() squad = 'מתן';
  @Input() workCenter = 'להבה';
  @Output() searchText$: EventEmitter<string> = new EventEmitter<string>();
  searchText = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  @HostListener('input') oninput() {
    this.searchText$.emit(this.searchText);
  }

}
