import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCurrencyInputComponent } from './core-currency-input.component';

describe('CoreCurrencyInputComponent', () => {
  let component: CoreCurrencyInputComponent;
  let fixture: ComponentFixture<CoreCurrencyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreCurrencyInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreCurrencyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
