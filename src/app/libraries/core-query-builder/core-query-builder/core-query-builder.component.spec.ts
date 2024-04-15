import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreQueryBuilderComponent } from './core-query-builder.component';

describe('CoreQueryBuilderComponent', () => {
  let component: CoreQueryBuilderComponent;
  let fixture: ComponentFixture<CoreQueryBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreQueryBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreQueryBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
