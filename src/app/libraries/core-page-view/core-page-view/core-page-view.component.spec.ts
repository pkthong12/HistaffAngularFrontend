import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePageViewComponent } from './core-page-view.component';

describe('CorePageViewComponent', () => {
  let component: CorePageViewComponent;
  let fixture: ComponentFixture<CorePageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePageViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
