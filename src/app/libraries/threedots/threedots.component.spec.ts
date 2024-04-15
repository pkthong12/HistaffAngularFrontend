import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedotsComponent } from './threedots.component';

describe('ThreedotsComponent', () => {
  let component: ThreedotsComponent;
  let fixture: ComponentFixture<ThreedotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreedotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreedotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
