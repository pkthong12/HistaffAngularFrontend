import { TestBed } from '@angular/core/testing';

import { CorePaginationService } from './core-pagination.service';

describe('CorePaginationService', () => {
  let service: CorePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
