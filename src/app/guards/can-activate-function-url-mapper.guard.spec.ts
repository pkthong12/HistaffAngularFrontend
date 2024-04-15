import { TestBed } from '@angular/core/testing';

import { CanActivateFunctionUrlMapperGuard } from './can-activate-function-url-mapper.guard';

describe('CanActivateFunctionUrlMapperGuard', () => {
  let guard: CanActivateFunctionUrlMapperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateFunctionUrlMapperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
