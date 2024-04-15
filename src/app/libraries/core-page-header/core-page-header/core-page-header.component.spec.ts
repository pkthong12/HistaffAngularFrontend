import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePageHeaderComponent } from './core-page-header.component';

describe('CorePageHeaderComponent', () => {
  let component: CorePageHeaderComponent;
  let fixture: ComponentFixture<CorePageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
