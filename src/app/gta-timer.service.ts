import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GtaTimerService {

  private messagesSource = new Subject<string>();

  public messages$ = this.messagesSource.asObservable();

  publishMessage(message : string){
    this.messagesSource.next(message);
  }

  constructor() { }
}
