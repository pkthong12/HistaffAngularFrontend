import { TestBed } from '@angular/core/testing';

import { InitializationGuard } from './initialization.guard';

describe('InitializationGuard', () => {
  let guard: InitializationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InitializationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
