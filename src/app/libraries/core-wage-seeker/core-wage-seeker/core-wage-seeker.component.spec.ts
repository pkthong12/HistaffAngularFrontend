import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreWageSeekerComponent } from './core-wage-seeker.component';

describe('CoreWageSeekerComponent', () => {
  let component: CoreWageSeekerComponent;
  let fixture: ComponentFixture<CoreWageSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreWageSeekerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreWageSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
