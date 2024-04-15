import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreParamControlComponent } from './core-param-control.component';

describe('CoreParamControlComponent', () => {
  let component: CoreParamControlComponent;
  let fixture: ComponentFixture<CoreParamControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreParamControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreParamControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
