import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStateComponent } from './dialog-state.component';

describe('DialogStateComponent', () => {
  let component: DialogStateComponent;
  let fixture: ComponentFixture<DialogStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
