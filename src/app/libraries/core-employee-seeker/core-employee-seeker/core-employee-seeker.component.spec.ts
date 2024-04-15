import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreEmployeeSeekerComponent } from './core-employee-seeker.component';

describe('CoreEmployeeSeekerComponent', () => {
  let component: CoreEmployeeSeekerComponent;
  let fixture: ComponentFixture<CoreEmployeeSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreEmployeeSeekerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreEmployeeSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
