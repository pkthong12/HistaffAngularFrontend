import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreButtonGroupVnsComponent } from './core-button-group-vns.component';

describe('CoreButtonGroupVnsComponent', () => {
  let component: CoreButtonGroupVnsComponent;
  let fixture: ComponentFixture<CoreButtonGroupVnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreButtonGroupVnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreButtonGroupVnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
