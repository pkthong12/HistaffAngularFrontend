import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreAccordionComponent } from './core-accordion.component';

describe('CoreAccordionComponent', () => {
  let component: CoreAccordionComponent;
  let fixture: ComponentFixture<CoreAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
