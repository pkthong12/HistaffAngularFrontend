import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreHeaderParamsComponent } from './core-header-params.component';

describe('CoreHeaderParamsComponent', () => {
  let component: CoreHeaderParamsComponent;
  let fixture: ComponentFixture<CoreHeaderParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreHeaderParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreHeaderParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
