import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreContractSeekerComponent } from './core-contract-seeker.component';

describe('CoreContractSeekerComponent', () => {
  let component: CoreContractSeekerComponent;
  let fixture: ComponentFixture<CoreContractSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreContractSeekerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreContractSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
