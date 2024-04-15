import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreScrollLazyComponent } from './core-scroll-lazy.component';

describe('CoreScrollLazyComponent', () => {
  let component: CoreScrollLazyComponent;
  let fixture: ComponentFixture<CoreScrollLazyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreScrollLazyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreScrollLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
