import { TestBed } from '@angular/core/testing';

import { MultiLanguageService } from './multi-language.service';

describe('MultiLanguageService', () => {
  let service: MultiLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
