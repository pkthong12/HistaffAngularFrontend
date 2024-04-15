import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreScrollComponent } from './core-scroll.component';

describe('CoreScrollComponent', () => {
  let component: CoreScrollComponent;
  let fixture: ComponentFixture<CoreScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
