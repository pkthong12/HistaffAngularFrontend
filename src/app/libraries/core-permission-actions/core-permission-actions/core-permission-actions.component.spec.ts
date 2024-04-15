import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePermissionActionsComponent } from './core-permission-actions.component';

describe('CorePermissionActionsComponent', () => {
  let component: CorePermissionActionsComponent;
  let fixture: ComponentFixture<CorePermissionActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePermissionActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePermissionActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
