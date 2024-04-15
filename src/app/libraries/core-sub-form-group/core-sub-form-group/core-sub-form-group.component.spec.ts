import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreSubFormGroupComponent } from './core-sub-form-group.component';

describe('CoreSubFormGroupComponent', () => {
  let component: CoreSubFormGroupComponent;
  let fixture: ComponentFixture<CoreSubFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreSubFormGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreSubFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
