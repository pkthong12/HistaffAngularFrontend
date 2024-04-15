import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePaginationFullComponent } from './core-pagination-full.component';

describe('CorePaginationFullComponent', () => {
  let component: CorePaginationFullComponent;
  let fixture: ComponentFixture<CorePaginationFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePaginationFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePaginationFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
