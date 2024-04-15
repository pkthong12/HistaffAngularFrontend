import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreControlNoGridBufferComponent } from './core-control-no-grid-buffer.component';

describe('CoreControlNoGridBufferComponent', () => {
  let component: CoreControlNoGridBufferComponent;
  let fixture: ComponentFixture<CoreControlNoGridBufferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreControlNoGridBufferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreControlNoGridBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
