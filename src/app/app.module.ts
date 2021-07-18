import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModulesPro, ToastModule} from 'ng-uikit-pro-standard';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {RouterModule, Routes} from '@angular/router';
import {TailDataModule} from './tail-data/tail-data.module';
import {PickTailsComponent} from './pick-tails/pick-tails.component';

const routes: Routes = [
  { path: '', redirectTo: 'pick-tails', pathMatch: 'full'},
  { path: 'pick-tails', component: PickTailsComponent},
  { path: 'tail-data', loadChildren: () => import('./tail-data/tail-data.module').then(mod => mod.TailDataModule)}
];

@NgModule({
  declarations: [
    AppComponent,
    PickTailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    RouterModule.forRoot(routes),
    TailDataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
