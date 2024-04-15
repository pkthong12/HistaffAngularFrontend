import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreApiProgressComponent } from './core-api-progress.component';

describe('CoreApiProgressComponent', () => {
  let component: CoreApiProgressComponent;
  let fixture: ComponentFixture<CoreApiProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreApiProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreApiProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
