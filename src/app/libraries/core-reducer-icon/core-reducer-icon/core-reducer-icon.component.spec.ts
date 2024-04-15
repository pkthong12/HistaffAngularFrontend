import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreReducerIconComponent } from './core-reducer-icon.component';

describe('CoreReducerIconComponent', () => {
  let component: CoreReducerIconComponent;
  let fixture: ComponentFixture<CoreReducerIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreReducerIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreReducerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
