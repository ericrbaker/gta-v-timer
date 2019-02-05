import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupplyTimerComponent } from './supply-timer/supply-timer.component';
import { CarTimerComponent } from './car-timer/car-timer.component';
import { GtaTimerService } from './gta-timer.service'

@NgModule({
  declarations: [
    AppComponent,
    SupplyTimerComponent,
    CarTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GtaTimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
