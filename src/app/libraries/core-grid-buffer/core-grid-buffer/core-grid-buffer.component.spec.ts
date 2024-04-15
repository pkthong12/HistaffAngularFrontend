import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreGridBufferComponent } from './core-grid-buffer.component';

describe('CoreGridBufferComponent', () => {
  let component: CoreGridBufferComponent;
  let fixture: ComponentFixture<CoreGridBufferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreGridBufferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreGridBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
