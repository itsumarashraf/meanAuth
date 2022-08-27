import { TestBed } from '@angular/core/testing';

import { ReminisceService } from './reminisce.service';

describe('ReminisceService', () => {
  let service: ReminisceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReminisceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
