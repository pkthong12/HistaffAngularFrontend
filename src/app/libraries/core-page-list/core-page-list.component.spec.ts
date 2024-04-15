import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePageListComponent } from './core-page-list.component';

describe('CorePageListComponent', () => {
  let component: CorePageListComponent;
  let fixture: ComponentFixture<CorePageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
