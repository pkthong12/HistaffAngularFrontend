import { TestBed } from '@angular/core/testing';

import { CoreFormService } from './core-form.service';

describe('CoreFormService', () => {
  let service: CoreFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
