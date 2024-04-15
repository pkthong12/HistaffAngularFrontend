import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysModuleEditComponent } from './sys-module-edit.component';

describe('SysModuleEditComponent', () => {
  let component: SysModuleEditComponent;
  let fixture: ComponentFixture<SysModuleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysModuleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysModuleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
