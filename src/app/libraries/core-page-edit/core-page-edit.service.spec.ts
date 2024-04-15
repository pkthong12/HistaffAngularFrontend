import { TestBed } from '@angular/core/testing';

import { CorePageEditService } from './core-page-edit.service';

describe('CorePageEditService', () => {
  let service: CorePageEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorePageEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
