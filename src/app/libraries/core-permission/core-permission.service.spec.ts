import { TestBed } from '@angular/core/testing';

import { CorePermissionService } from './core-permission.service';

describe('CorePermissionService', () => {
  let service: CorePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorePermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
