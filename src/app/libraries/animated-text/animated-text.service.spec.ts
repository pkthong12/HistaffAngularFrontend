import { TestBed } from '@angular/core/testing';

import { AnimatedTextService } from './animated-text.service';

describe('AnimatedTextService', () => {
  let service: AnimatedTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimatedTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
