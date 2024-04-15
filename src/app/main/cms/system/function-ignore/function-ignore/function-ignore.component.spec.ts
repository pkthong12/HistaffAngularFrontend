import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionIgnoreComponent } from './function-ignore.component';

describe('FunctionIgnoreComponent', () => {
  let component: FunctionIgnoreComponent;
  let fixture: ComponentFixture<FunctionIgnoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionIgnoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionIgnoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
