import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreButtonComponent } from './core-button.component';

describe('CoreButtonComponent', () => {
  let component: CoreButtonComponent;
  let fixture: ComponentFixture<CoreButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
