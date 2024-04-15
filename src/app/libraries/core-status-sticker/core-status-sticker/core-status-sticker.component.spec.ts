import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreStatusStickerComponent } from './core-status-sticker.component';

describe('CoreStatusStickerComponent', () => {
  let component: CoreStatusStickerComponent;
  let fixture: ComponentFixture<CoreStatusStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreStatusStickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreStatusStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
