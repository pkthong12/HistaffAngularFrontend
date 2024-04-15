import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreYearPickerComponent } from './core-year-picker.component';

describe('CoreYearPickerComponent', () => {
  let component: CoreYearPickerComponent;
  let fixture: ComponentFixture<CoreYearPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreYearPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreYearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
