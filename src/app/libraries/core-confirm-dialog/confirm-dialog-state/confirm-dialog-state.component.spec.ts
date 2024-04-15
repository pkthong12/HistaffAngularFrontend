import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogStateComponent } from './confirm-dialog-state.component';

describe('ConfirmDialogStateComponent', () => {
  let component: ConfirmDialogStateComponent;
  let fixture: ComponentFixture<ConfirmDialogStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
