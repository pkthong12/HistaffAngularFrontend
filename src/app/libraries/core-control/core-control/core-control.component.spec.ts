import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreControlComponent } from './core-control.component';

describe('CoreControlComponent', () => {
  let component: CoreControlComponent;
  let fixture: ComponentFixture<CoreControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
