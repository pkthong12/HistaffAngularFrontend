import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreLoadingSurfaceComponent } from './core-loading-surface.component';

describe('CoreLoadingSurfaceComponent', () => {
  let component: CoreLoadingSurfaceComponent;
  let fixture: ComponentFixture<CoreLoadingSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreLoadingSurfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreLoadingSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
