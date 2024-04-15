import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePositionSeekerComponent } from './core-position-seeker.component';

describe('CorePositionSeekerComponent', () => {
  let component: CorePositionSeekerComponent;
  let fixture: ComponentFixture<CorePositionSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePositionSeekerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePositionSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
