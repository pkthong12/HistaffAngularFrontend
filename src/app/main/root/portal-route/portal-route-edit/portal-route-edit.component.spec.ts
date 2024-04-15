import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRouteEditComponent } from './portal-route-edit.component';

describe('PortalRouteEditComponent', () => {
  let component: PortalRouteEditComponent;
  let fixture: ComponentFixture<PortalRouteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalRouteEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalRouteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
