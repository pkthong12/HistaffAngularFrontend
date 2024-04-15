import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePageEditComponent } from './core-page-edit.component';

describe('CorePageEditComponent', () => {
  let component: CorePageEditComponent;
  let fixture: ComponentFixture<CorePageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePageEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
