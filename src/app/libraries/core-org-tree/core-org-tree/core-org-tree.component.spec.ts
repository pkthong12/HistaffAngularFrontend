import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreOrgTreeComponent } from './core-org-tree.component';

describe('CoreOrgTreeComponent', () => {
  let component: CoreOrgTreeComponent;
  let fixture: ComponentFixture<CoreOrgTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreOrgTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreOrgTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
