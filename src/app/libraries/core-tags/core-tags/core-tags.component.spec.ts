import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTagsComponent } from './core-tags.component';

describe('CoreTagsComponent', () => {
  let component: CoreTagsComponent;
  let fixture: ComponentFixture<CoreTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
