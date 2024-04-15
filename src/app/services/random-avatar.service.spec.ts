import { TestBed } from '@angular/core/testing';

import { RandomAvatarService } from './random-avatar.service';

describe('RandomAvatarService', () => {
  let service: RandomAvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomAvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
