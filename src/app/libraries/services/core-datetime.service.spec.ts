import { TestBed } from '@angular/core/testing';

import { CoreDatetimeService } from './core-datetime.service';

describe('CoreDatetimeService', () => {
  let service: CoreDatetimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreDatetimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
