import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePaginationComponent } from './core-pagination.component';

describe('CorePaginationComponent', () => {
  let component: CorePaginationComponent;
  let fixture: ComponentFixture<CorePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
