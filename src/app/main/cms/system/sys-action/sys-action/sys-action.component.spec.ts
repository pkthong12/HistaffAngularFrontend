import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysActionComponent } from './sys-action.component';

describe('SysActionComponent', () => {
  let component: SysActionComponent;
  let fixture: ComponentFixture<SysActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
