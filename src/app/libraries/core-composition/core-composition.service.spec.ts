import { TestBed } from '@angular/core/testing';

import { CoreCompositionService } from './core-composition.service';

describe('CoreCompositionService', () => {
  let service: CoreCompositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreCompositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
