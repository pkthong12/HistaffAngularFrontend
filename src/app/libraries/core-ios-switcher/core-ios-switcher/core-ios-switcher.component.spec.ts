import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreIosSwitcherComponent } from './core-ios-switcher.component';

describe('CoreIosSwitcherComponent', () => {
  let component: CoreIosSwitcherComponent;
  let fixture: ComponentFixture<CoreIosSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreIosSwitcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreIosSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
