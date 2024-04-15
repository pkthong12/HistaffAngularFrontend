import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysFunctionActionMapperComponent } from './sys-function-action-mapper.component';

describe('SysFunctionActionMapperComponent', () => {
  let component: SysFunctionActionMapperComponent;
  let fixture: ComponentFixture<SysFunctionActionMapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysFunctionActionMapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysFunctionActionMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
