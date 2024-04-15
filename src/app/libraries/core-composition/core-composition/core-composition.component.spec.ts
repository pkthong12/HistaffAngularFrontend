import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCompositionComponent } from './core-composition.component';

describe('CoreCompositionComponent', () => {
  let component: CoreCompositionComponent;
  let fixture: ComponentFixture<CoreCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreCompositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
