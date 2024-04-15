import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePositionConcurrentSeekerComponent } from './core-position-concurrent-seeker.component';

describe('CorePositionConcurrentSeekerComponent', () => {
  let component: CorePositionConcurrentSeekerComponent;
  let fixture: ComponentFixture<CorePositionConcurrentSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePositionConcurrentSeekerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePositionConcurrentSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
