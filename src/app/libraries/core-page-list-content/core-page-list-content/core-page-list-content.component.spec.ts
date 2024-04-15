import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePageListContentComponent } from './core-page-list-content.component';

describe('CorePageListContentComponent', () => {
  let component: CorePageListContentComponent;
  let fixture: ComponentFixture<CorePageListContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePageListContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePageListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
