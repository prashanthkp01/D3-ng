import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {DataService} from './data.service';

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, PieChartComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}