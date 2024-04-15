import { TestBed } from '@angular/core/testing';

import { CoreOrgTreeService } from './core-org-tree.service';

describe('CoreOrgTreeService', () => {
  let service: CoreOrgTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreOrgTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
