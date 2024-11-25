import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupportIncidenceComponent } from './edit-support-incidence.component';

describe('EditSupportIncidenceComponent', () => {
  let component: EditSupportIncidenceComponent;
  let fixture: ComponentFixture<EditSupportIncidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSupportIncidenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSupportIncidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
