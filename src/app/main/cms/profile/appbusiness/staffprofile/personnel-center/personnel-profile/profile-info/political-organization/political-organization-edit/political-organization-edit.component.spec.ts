import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalOrganizationEditComponent } from './political-organization-edit.component';

describe('PoliticalOrganizationEditComponent', () => {
  let component: PoliticalOrganizationEditComponent;
  let fixture: ComponentFixture<PoliticalOrganizationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalOrganizationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticalOrganizationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
