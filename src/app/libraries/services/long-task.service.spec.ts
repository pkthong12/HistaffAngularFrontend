import { TestBed } from '@angular/core/testing';

import { LongTaskService } from './long-task.service';

describe('LongTaskService', () => {
  let service: LongTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
