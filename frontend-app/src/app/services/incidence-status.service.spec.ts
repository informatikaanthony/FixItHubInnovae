import { TestBed } from '@angular/core/testing';

import { IncidenceStatusService } from './incidence-status.service';

describe('IncidenceStatusService', () => {
  let service: IncidenceStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidenceStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
