import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './data-table/data-table.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import {TailDataComponent} from './tail-data.component';
import {IconsModule, MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {ToggleColumnsComponent} from './data-table/toggle-columns/toggle-columns.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MissionZeroComponent} from './tables/mission-zero/mission-zero.component';

const routes: Routes = [
  {
    path: 'tail-data', component: TailDataComponent, children: [
      {path: 'mission-zero/:tailId', component: MissionZeroComponent}
    ]
  }
];

@NgModule({
  declarations: [
    TailDataComponent,
    DataTableComponent,
    SearchBarComponent,
    NavbarComponent,
    ToggleColumnsComponent,
    MissionZeroComponent],
  exports: [
    NavbarComponent,
    SearchBarComponent,
    TailDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    RouterModule.forChild(routes),
    IconsModule
  ]
})
export class TailDataModule {
}
