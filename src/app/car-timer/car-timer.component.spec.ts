import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTimerComponent } from './car-timer.component';

describe('CarTimerComponent', () => {
  let component: CarTimerComponent;
  let fixture: ComponentFixture<CarTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
