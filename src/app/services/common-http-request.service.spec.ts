import { TestBed } from '@angular/core/testing';

import { CommonHttpRequestService } from './common-http-request.service';

describe('CommonHttpRequestService', () => {
  let service: CommonHttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonHttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
