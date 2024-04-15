import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysActionEditComponent } from './sys-action-edit.component';

describe('SysActionEditComponent', () => {
  let component: SysActionEditComponent;
  let fixture: ComponentFixture<SysActionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysActionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysActionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
