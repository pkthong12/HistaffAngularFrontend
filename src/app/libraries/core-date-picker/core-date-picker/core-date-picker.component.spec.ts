import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreDatePickerComponent } from './core-date-picker.component';

describe('CoreDatePickerComponent', () => {
  let component: CoreDatePickerComponent;
  let fixture: ComponentFixture<CoreDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreDatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
