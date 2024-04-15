import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysModuleComponent } from './sys-module.component';

describe('SysModuleComponent', () => {
  let component: SysModuleComponent;
  let fixture: ComponentFixture<SysModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
