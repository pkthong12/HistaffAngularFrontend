import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTreeComponent } from './core-tree.component';

describe('CoreTreeComponent', () => {
  let component: CoreTreeComponent;
  let fixture: ComponentFixture<CoreTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
