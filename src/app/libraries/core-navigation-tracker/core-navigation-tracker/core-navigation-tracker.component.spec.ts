import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreNavigationTrackerComponent } from './core-navigation-tracker.component';

describe('CoreNavigationTrackerComponent', () => {
  let component: CoreNavigationTrackerComponent;
  let fixture: ComponentFixture<CoreNavigationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreNavigationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreNavigationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
