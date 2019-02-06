import { Component, OnInit, Input } from '@angular/core';
import { GtaTimerService } from '../gta-timer.service'
import { timer } from 'rxjs'

@Component({
  selector: 'app-car-timer',
  templateUrl: './car-timer.component.html',
  styleUrls: ['./car-timer.component.css']
})
export class CarTimerComponent implements OnInit {

  @Input() title: string;
  numCars: number = 1; 
  timeLeft: number;
  timeLeftDisplay: string;

  constructor(private gtaTimerService: GtaTimerService) { }

  startTimer() {

    if(this.numCars == 0)
      return;

    // calculate time left based on user input
    this.timeLeft = (20 + ((this.numCars - 1) * 10)) * 60;

    // start timer that ticks every 1 second (1000 ms)
    const source = timer(0, 1000);
    const subscribe = source.subscribe(val => {

      if(this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 1;
        this.timeLeftDisplay = this.secondsToHms(this.timeLeft);
      }
     
      if(this.timeLeft == 0){
        this.gtaTimerService.publishMessage(`${this.title} cooldown is up.`);
        subscribe.unsubscribe();
      }
    });

    this.gtaTimerService.publishMessage(`${this.title} has been updated with ${this.numCars} cars.`);
  }

  secondsToHms(d) {
    d = Number(d);

    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
  }

  ngOnInit() {
  }

}
