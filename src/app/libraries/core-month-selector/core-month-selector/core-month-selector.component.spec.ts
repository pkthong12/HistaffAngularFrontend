import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreMonthSelectorComponent } from './core-month-selector.component';

describe('CoreMonthSelectorComponent', () => {
  let component: CoreMonthSelectorComponent;
  let fixture: ComponentFixture<CoreMonthSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreMonthSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreMonthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
