import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreButtonGroupComponent } from './core-button-group.component';

describe('CoreButtonGroupComponent', () => {
  let component: CoreButtonGroupComponent;
  let fixture: ComponentFixture<CoreButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreButtonGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
