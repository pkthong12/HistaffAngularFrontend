import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreConfirmDialogComponent } from './core-confirm-dialog.component';

describe('CoreConfirmDialogComponent', () => {
  let component: CoreConfirmDialogComponent;
  let fixture: ComponentFixture<CoreConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
