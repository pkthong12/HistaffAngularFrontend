import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreListLazyComponent } from './core-list-lazy.component';

describe('CoreListLazyComponent', () => {
  let component: CoreListLazyComponent;
  let fixture: ComponentFixture<CoreListLazyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreListLazyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreListLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
