import { TestBed } from '@angular/core/testing';

import { CorePageListService } from './core-page-list.service';

describe('CorePageListService', () => {
  let service: CorePageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorePageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
