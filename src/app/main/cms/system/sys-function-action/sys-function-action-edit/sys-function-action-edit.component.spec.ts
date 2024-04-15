import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysFunctionActionEditComponent } from './sys-function-action-edit.component';

describe('SysFunctionActionEditComponent', () => {
  let component: SysFunctionActionEditComponent;
  let fixture: ComponentFixture<SysFunctionActionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysFunctionActionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysFunctionActionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
