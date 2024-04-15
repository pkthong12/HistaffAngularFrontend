import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysFunctionActionComponent } from './sys-function-action.component';

describe('SysFunctionActionComponent', () => {
  let component: SysFunctionActionComponent;
  let fixture: ComponentFixture<SysFunctionActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysFunctionActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysFunctionActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
