import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigndefaultImportComponent } from './signdefault-import.component';

describe('SigndefaultImportComponent', () => {
  let component: SigndefaultImportComponent;
  let fixture: ComponentFixture<SigndefaultImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigndefaultImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigndefaultImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
