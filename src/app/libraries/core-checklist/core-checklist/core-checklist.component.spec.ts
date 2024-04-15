import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreChecklistComponent } from './core-checklist.component';

describe('CoreChecklistComponent', () => {
  let component: CoreChecklistComponent;
  let fixture: ComponentFixture<CoreChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
