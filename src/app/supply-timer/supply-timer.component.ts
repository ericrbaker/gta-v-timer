import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs'
import '../../scripts/loading-bar.js'
import { ConstantPool } from '@angular/compiler';
import { GtaTimerService } from '../gta-timer.service'
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

declare var ldBar: any;

@Component({
  selector: 'app-supply-timer',
  templateUrl: './supply-timer.component.html',
  styleUrls: ['./supply-timer.component.css']
})
export class SupplyTimerComponent implements OnInit {

  @Input() type: string;
  @Input() title: string;
  @Input() totalStockSec: number;
  @Input() fullSuppliesMinutes: number;
  @Input() fullStockMinutes: number;
  @Input() percentSupplies: number;
  @Input() percentStock: number;
  @Input() progressBarVectorPath: string;
  @Input() progressBarFillColor: string;
  @Input() progressBarBgColor: string;

  suppliesTimeLeft : number;
  suppliesTimeLeftDisplay: string;
  
  stockTimeLeft : number;
  stockTimeLeftDisplay: string;

  supplies: number;
  stock: number;

  private source: any;
  private subscribe: any;

  constructor(private gtaTimerService: GtaTimerService) { }

  startTimer() {

    // clear any currently running timer, if any
    if(this.subscribe != null)
      this.subscribe.unsubscribe();

    if(isNaN(this.supplies))
      this.supplies = 0;

    if(isNaN(this.stock))
      this.stock = 0;

    // calculate time left based on user input
    this.suppliesTimeLeft = ((this.supplies/100) * this.fullSuppliesMinutes) * 60;
    this.stockTimeLeft = ((this.stock/100) * this.fullStockMinutes) * 60;
    var elapsedStockSeconds = this.totalStockSec - this.stockTimeLeft;

    // start timer that ticks every 1 second (1000 ms)
    this.source = timer(0, 1000);
    this.subscribe = this.source.subscribe(val => {

      var suppliesLoadingBar = new ldBar("#" + this.type + "-suppliesBar");
      var stockLoadingBar = new ldBar("#" + this.type + "-stockBar");

      if(this.suppliesTimeLeft > 0) {
        this.suppliesTimeLeft = this.suppliesTimeLeft - 1;
        this.suppliesTimeLeftDisplay = this.secondsToHms(this.suppliesTimeLeft);
      }
      else if(this.suppliesTimeLeft == 0 ){ 
        this.gtaTimerService.publishMessage(`${this.title} supply is depleted.`);
        this.suppliesTimeLeft = -1; // set to -1 to signal the supply timer is done
      }

      if(this.stockTimeLeft > 0) {
        this.stockTimeLeft = this.stockTimeLeft - 1;
        this.stockTimeLeftDisplay = this.secondsToHms(this.stockTimeLeft);
      }
      else if(this.stockTimeLeft == 0 ){
        this.gtaTimerService.publishMessage(`${this.title} stock is depleted.`);
        this.stockTimeLeft = -1; // set to -1 to signal the stock timer is done
      }

      suppliesLoadingBar.set(this.suppliesTimeLeft * this.percentSupplies);
      stockLoadingBar.set(this.stockTimeLeft * this.percentStock);

      // if they are both done, kill the timer
      if(this.suppliesTimeLeft == -1 && this.stockTimeLeft == -1){
        this.subscribe.unsubscribe();
      }

    });

    this.gtaTimerService.publishMessage(`${this.title} has been updated.`);
  }

  secondsToHms(d) {
    d = Number(d);

    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
  }

  ngOnInit() {

    this.suppliesTimeLeftDisplay = this.secondsToHms(0);
    this.stockTimeLeftDisplay = this.secondsToHms(this.totalStockSec);
  }

}
