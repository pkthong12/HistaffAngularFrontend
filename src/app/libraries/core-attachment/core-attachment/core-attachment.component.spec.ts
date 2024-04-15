import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreAttachmentComponent } from './core-attachment.component';

describe('CoreAttachmentComponent', () => {
  let component: CoreAttachmentComponent;
  let fixture: ComponentFixture<CoreAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreAttachmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
