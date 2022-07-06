import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { BehaviorSubject, catchError, map, filter, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor() { }
  listAlumno:Alumno[]=[
    {nombres: "Jose", apellidos: "Ramirez", correo: "joseas@asda.com", estado: "Aprobado", telefono: 93453364},
    {nombres: "Maria ", apellidos: "Guzman", correo: "mariasd@asd.was", estado: "Aprobado", telefono: 91375784},
    {nombres: "Juana ", apellidos: "Rojas", correo: "juwnneas@sdfe.de", estado: "Desaprobado", telefono: 97845344},
    {nombres: "Katherine ", apellidos: "Ponce ", correo: "kenasdkk@asdasd.ew", estado: "Aprobado", telefono: 9745384},
    {nombres: "Cesar", apellidos: " Rodríguez ", correo: "wewad@sadas.ea", estado: "Desaprobado", telefono: 9778684}
  ];

  /* getAlumnos() {
    return this.listAlumno.slice();
  } */

/*   eliminarAlumno(index: number) {
    this.listAlumno.splice(index, 1);
  } */

/*   agregarAlumno(Alumno: Alumno) {
    this.listAlumno.unshift(Alumno);
  } */

  /* getAlumno(index: number) {
    return this.listAlumno[index];
  } */

  editAlumno(Alumno: Alumno, idAlumno: number){
    this.listAlumno[idAlumno].nombres = Alumno.nombres;
    this.listAlumno[idAlumno].correo = Alumno.correo;
    this.listAlumno[idAlumno].apellidos = Alumno.apellidos;
    this.listAlumno[idAlumno].telefono = Alumno.telefono;
    this.listAlumno[idAlumno].estado = Alumno.estado;
  }

  alumnoSelected$ = new Subject<Alumno | null>();
  alumnos$ = new BehaviorSubject<Alumno[]>(this.listAlumno);


  addAlumno(alumno:Alumno){
    this.listAlumno.push(alumno)
    this.alumnos$.next(this.listAlumno)
  }

  getAlumnos(){
    return this.alumnos$.asObservable()
  }

  getAlumnoSelect(){
    return this.alumnoSelected$.asObservable()
  }

  selectAlumnoByIndex(index?: number){
    this.alumnoSelected$.next(index !== undefined ? this.listAlumno[index] : null)
  }

  deleteAlumnoByIndex(index?: number){
    this.listAlumno = this.listAlumno.filter((_, i) => index != i)
    this.alumnos$.next(this.listAlumno)
  }

  searchAlumnosByName(name: string){
    return from(this.listAlumno).pipe(
      filter((alumno)=>(alumno.nombres + ' ' + alumno.apellidos).toLowerCase().includes(name.toLowerCase())),
      map((alumno) => {
      return alumno}),
      catchError((error) => {throw new Error(error)})
    )
  }

  obtenerAlumno(index:number):Promise<Alumno>{
    return new Promise((resolve, rejects)=>{
      const alumno = this.listAlumno[index];
      if(alumno){
        return resolve(alumno)
      }
      rejects({mensaje: 'error al cargar el alumno'})
    })
    
  }





}
