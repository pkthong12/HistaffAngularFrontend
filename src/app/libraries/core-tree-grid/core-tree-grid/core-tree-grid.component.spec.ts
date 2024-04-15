import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTreeGridComponent } from './core-tree-grid.component';

describe('CoreTreeGridComponent', () => {
  let component: CoreTreeGridComponent;
  let fixture: ComponentFixture<CoreTreeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreTreeGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTreeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
