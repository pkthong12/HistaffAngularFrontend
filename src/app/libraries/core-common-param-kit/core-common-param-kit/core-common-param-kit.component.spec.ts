import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCommonParamKitComponent } from './core-common-param-kit.component';

describe('CoreCommonParamKitComponent', () => {
  let component: CoreCommonParamKitComponent;
  let fixture: ComponentFixture<CoreCommonParamKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreCommonParamKitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreCommonParamKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
