import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreOrgchartflexComponent } from './core-orgchartflex.component';

describe('CoreOrgchartflexComponent', () => {
  let component: CoreOrgchartflexComponent;
  let fixture: ComponentFixture<CoreOrgchartflexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreOrgchartflexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreOrgchartflexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
