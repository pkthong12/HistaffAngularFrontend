import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFormControlBaseComponent } from './core-form-control-base.component';

describe('CoreFormControlBaseComponent', () => {
  let component: CoreFormControlBaseComponent;
  let fixture: ComponentFixture<CoreFormControlBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreFormControlBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreFormControlBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
