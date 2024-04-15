import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFormControlSeekerComponent } from './core-form-control-seeker.component';

describe('CoreFormControlSeekerComponent', () => {
  let component: CoreFormControlSeekerComponent;
  let fixture: ComponentFixture<CoreFormControlSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreFormControlSeekerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreFormControlSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
