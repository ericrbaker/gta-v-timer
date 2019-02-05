import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyTimerComponent } from './supply-timer.component';

describe('SupplyTimerComponent', () => {
  let component: SupplyTimerComponent;
  let fixture: ComponentFixture<SupplyTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
