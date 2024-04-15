import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreMccComponent } from './core-mcc.component';

describe('CoreMccComponent', () => {
  let component: CoreMccComponent;
  let fixture: ComponentFixture<CoreMccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreMccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreMccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
