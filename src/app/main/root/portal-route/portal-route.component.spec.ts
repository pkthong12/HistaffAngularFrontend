import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRouteComponent } from './portal-route.component';

describe('PortalRouteComponent', () => {
  let component: PortalRouteComponent;
  let fixture: ComponentFixture<PortalRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
