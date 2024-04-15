import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreOrgUnitSeekerComponent } from './core-org-unit-seeker.component';

describe('CoreOrgUnitSeekerComponent', () => {
  let component: CoreOrgUnitSeekerComponent;
  let fixture: ComponentFixture<CoreOrgUnitSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreOrgUnitSeekerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreOrgUnitSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
