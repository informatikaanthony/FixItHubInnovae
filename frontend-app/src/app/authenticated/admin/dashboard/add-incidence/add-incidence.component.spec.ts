import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidenceComponent } from './add-incidence.component';

describe('AddIncidenceComponent', () => {
  let component: AddIncidenceComponent;
  let fixture: ComponentFixture<AddIncidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIncidenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIncidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
