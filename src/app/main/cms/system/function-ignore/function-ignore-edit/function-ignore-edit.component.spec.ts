import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionIgnoreEditComponent } from './function-ignore-edit.component';

describe('FunctionIgnoreEditComponent', () => {
  let component: FunctionIgnoreEditComponent;
  let fixture: ComponentFixture<FunctionIgnoreEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionIgnoreEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionIgnoreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
