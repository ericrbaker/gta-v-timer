import { Component } from '@angular/core';
import { GtaTimerService } from './gta-timer.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GtaTimerService]
})
export class AppComponent {
  title = 'GTA Timer';
  history: string[] = [];

  constructor(private gtaTimerService: GtaTimerService) {
    gtaTimerService.messages$.subscribe(msg => { 
      this.history.push(`${new Date().toLocaleString()} - ${msg}`)
      $("#logDiv").scrollTop($("#logDiv")[0].scrollHeight); // scroll div to bottom
    })
  }
}
