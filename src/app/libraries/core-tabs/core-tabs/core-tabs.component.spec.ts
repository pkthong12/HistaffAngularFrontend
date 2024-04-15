import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTabsComponent } from './core-tabs.component';

describe('CoreTabsComponent', () => {
  let component: CoreTabsComponent;
  let fixture: ComponentFixture<CoreTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
