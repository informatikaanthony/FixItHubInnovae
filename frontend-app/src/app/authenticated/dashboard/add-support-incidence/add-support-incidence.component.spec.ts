import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupportIncidenceComponent } from './add-support-incidence.component';

describe('AddSupportIncidenceComponent', () => {
  let component: AddSupportIncidenceComponent;
  let fixture: ComponentFixture<AddSupportIncidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSupportIncidenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupportIncidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
