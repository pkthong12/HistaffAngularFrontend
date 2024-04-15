import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFileUploaderComponent } from './core-file-uploader.component';

describe('CoreFileUploaderComponent', () => {
  let component: CoreFileUploaderComponent;
  let fixture: ComponentFixture<CoreFileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreFileUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
