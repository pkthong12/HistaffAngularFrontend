import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreMonthPickerComponent } from './core-month-picker.component';

describe('CoreMonthPickerComponent', () => {
  let component: CoreMonthPickerComponent;
  let fixture: ComponentFixture<CoreMonthPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreMonthPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
