import { TestBed } from '@angular/core/testing';

import { CoreControlService } from './core-control.service';

describe('CoreControlService', () => {
  let service: CoreControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
