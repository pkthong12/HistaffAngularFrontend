import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuconcurrentlyComponent } from './huconcurrently.component';

describe('HuconcurrentlyComponent', () => {
  let component: HuconcurrentlyComponent;
  let fixture: ComponentFixture<HuconcurrentlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuconcurrentlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuconcurrentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
