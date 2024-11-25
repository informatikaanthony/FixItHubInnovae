import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncidenceComponent } from './edit-incidence.component';

describe('EditIncidenceComponent', () => {
  let component: EditIncidenceComponent;
  let fixture: ComponentFixture<EditIncidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIncidenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIncidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
