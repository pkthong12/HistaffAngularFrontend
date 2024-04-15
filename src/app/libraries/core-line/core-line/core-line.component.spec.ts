import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreLineComponent } from './core-line.component';

describe('CoreLineComponent', () => {
  let component: CoreLineComponent;
  let fixture: ComponentFixture<CoreLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
