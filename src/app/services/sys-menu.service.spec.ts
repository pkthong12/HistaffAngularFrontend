import { TestBed } from '@angular/core/testing';

import { SysMenuService } from './sys-menu.service';

describe('SysMenuService', () => {
  let service: SysMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
