import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreWorkingSeekerComponent } from './core-working-seeker.component';

describe('CoreWorkingSeekerComponent', () => {
  let component: CoreWorkingSeekerComponent;
  let fixture: ComponentFixture<CoreWorkingSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreWorkingSeekerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreWorkingSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
