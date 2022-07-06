import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';


@Component({
  selector: 'app-add-edit-alumno',
  templateUrl: './add-edit-alumno.component.html',
  styleUrls: ['./add-edit-alumno.component.css']
})
export class AddEditAlumnoComponent implements OnInit {
  estados: any[] = ['Aprobado', 'Desaprobado'];
  idAlumno: any;
  alumnoSeleccionado: Alumno | null=null;
  accion = 'Crear';
  myForm : FormGroup;
  error:{mensaje:String} |null =null;

  constructor(private fb: FormBuilder,
              private AlumnoService: AlumnoService, 
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute) { 
    this.myForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.maxLength(20)]],
      apellidos: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['',  [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      telefono: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      estado: ['', [Validators.required]]
    });
    const idParam = 'id';
    this.idAlumno = this.aRoute.snapshot.params[idParam];

  }
  ngOnInit(): void {
    if (this.idAlumno !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  guardarAlumno() {
      const Alumno: Alumno = {
      nombres: this.myForm.get('nombres')!.value,
      apellidos: this.myForm.get('apellidos')!.value,
      correo: this.myForm.get('correo')!.value,
      telefono: this.myForm.get('telefono')!.value,
      estado: this.myForm.get('estado')!.value,
    };

    if (this.idAlumno !== undefined) {
      this.editarAlumno(Alumno);
    } else {
      this.agregarAlumno(Alumno);
    }
  }

  agregarAlumno(Alumno: Alumno) {
    this.AlumnoService.addAlumno(Alumno);
    this.snackBar.open('El Alumno fue registrado con exito!', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  editarAlumno(Alumno: Alumno) {
    this.AlumnoService.editAlumno(Alumno, this.idAlumno);
    this.snackBar.open('El Alumno fue actualizado con exito!', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  esEditar() {
    //const alumnoSeleccionado: Alumno = this.AlumnoService.getAlumno(this.idAlumno);
    this.AlumnoService.obtenerAlumno(this.idAlumno).then((alumno)=>
    {
      this.myForm.patchValue({
        nombres: alumno.nombres,
        apellidos: alumno.apellidos,
        correo: alumno.correo,
        telefono: alumno.telefono,
        estado: alumno.estado,
      });
      console.log(alumno);
    }).catch((error)=>{
      this.error= error;
    })  
  }
  get nombreInvalido() {
    return this.myForm.get('nombres')?.hasError('required') && this.myForm.get('nombres')?.touched;
  }
  get apellidoInvalido() {
    return this.myForm.get('apellidos')?.hasError('required') && this.myForm.get('apellidos')?.touched;
  }

}
