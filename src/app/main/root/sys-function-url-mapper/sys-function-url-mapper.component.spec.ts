import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysFunctionUrlMapperComponent } from './sys-function-url-mapper.component';

describe('SysFunctionUrlMapperComponent', () => {
  let component: SysFunctionUrlMapperComponent;
  let fixture: ComponentFixture<SysFunctionUrlMapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysFunctionUrlMapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysFunctionUrlMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
