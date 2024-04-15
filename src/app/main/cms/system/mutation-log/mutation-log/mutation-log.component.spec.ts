import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutationLogComponent } from './mutation-log.component';

describe('MutationLogComponent', () => {
  let component: MutationLogComponent;
  let fixture: ComponentFixture<MutationLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutationLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
