import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePermissionComponent } from './core-permission.component';

describe('CorePermissionComponent', () => {
  let component: CorePermissionComponent;
  let fixture: ComponentFixture<CorePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
