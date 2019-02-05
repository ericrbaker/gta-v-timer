import { TestBed } from '@angular/core/testing';

import { GtaTimerService } from './gta-timer.service';

describe('GtaTimerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtaTimerService = TestBed.get(GtaTimerService);
    expect(service).toBeTruthy();
  });
});
