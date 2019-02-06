import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs'
import { ConstantPool } from '@angular/compiler';
import { GtaTimerService } from '../gta-timer.service'
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import '../../scripts/loading-bar.js'

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

  suppliesSeconds : number;
  suppliesTimeLeftDisplay: string;
  
  stockSeconds : number;
  stockTimeLeftDisplay: string;
  elapsedStockSeconds: number;

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
    this.suppliesSeconds = ((this.supplies/100) * this.fullSuppliesMinutes) * 60;
    this.stockSeconds = ((this.stock/100) * this.fullStockMinutes) * 60;
    this.elapsedStockSeconds = this.totalStockSec - this.stockSeconds;

    // start timer that ticks every 1 second (1000 ms)
    this.source = timer(0, 1000);
    this.subscribe = this.source.subscribe(val => {

      var suppliesLoadingBar = new ldBar("#" + this.type + "-suppliesBar");
      var stockLoadingBar = new ldBar("#" + this.type + "-stockBar");

      if(this.suppliesSeconds > 0) {
        this.suppliesSeconds = this.suppliesSeconds - 1;
        this.stockSeconds = this.stockSeconds + 1;
        this.elapsedStockSeconds = this.totalStockSec - this.stockSeconds;
        this.suppliesTimeLeftDisplay = this.secondsToHms(this.suppliesSeconds);
        this.stockTimeLeftDisplay = this.secondsToHms(this.elapsedStockSeconds);
      }
      else if(this.suppliesSeconds == 0 ){ 
        this.gtaTimerService.publishMessage(`${this.title} supply is depleted.`);
        this.subscribe.unsubscribe();
      }

      suppliesLoadingBar.set(this.suppliesSeconds * this.percentSupplies);
      stockLoadingBar.set(this.stockSeconds * this.percentStock);

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
