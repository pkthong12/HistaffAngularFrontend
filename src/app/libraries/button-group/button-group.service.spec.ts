import { TestBed } from '@angular/core/testing';

import { ButtonGroupService } from './button-group.service';

describe('ButtonGroupService', () => {
  let service: ButtonGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
