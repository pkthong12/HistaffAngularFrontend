import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreRoutingHistoryComponent } from './core-routing-history.component';

describe('CoreRoutingHistoryComponent', () => {
  let component: CoreRoutingHistoryComponent;
  let fixture: ComponentFixture<CoreRoutingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreRoutingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreRoutingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
