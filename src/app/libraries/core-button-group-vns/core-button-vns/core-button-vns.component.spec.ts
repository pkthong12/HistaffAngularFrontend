import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreButtonVnsComponent } from './core-button-vns.component';

describe('CoreButtonVnsComponent', () => {
  let component: CoreButtonVnsComponent;
  let fixture: ComponentFixture<CoreButtonVnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreButtonVnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreButtonVnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
