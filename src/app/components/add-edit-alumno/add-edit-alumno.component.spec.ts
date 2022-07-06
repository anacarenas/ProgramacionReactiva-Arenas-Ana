import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAlumnoComponent } from './add-edit-alumno.component';

describe('AddEditAlumnoComponent', () => {
  let component: AddEditAlumnoComponent;
  let fixture: ComponentFixture<AddEditAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
