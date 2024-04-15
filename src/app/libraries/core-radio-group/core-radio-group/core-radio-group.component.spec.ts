import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreRadioGroupComponent } from './core-radio-group.component';

describe('CoreRadioGroupComponent', () => {
  let component: CoreRadioGroupComponent;
  let fixture: ComponentFixture<CoreRadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreRadioGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
