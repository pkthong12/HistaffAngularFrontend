import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenModalLoaderComponent } from './fullscreen-modal-loader.component';

describe('FullscreenModalLoaderComponent', () => {
  let component: FullscreenModalLoaderComponent;
  let fixture: ComponentFixture<FullscreenModalLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullscreenModalLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenModalLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
