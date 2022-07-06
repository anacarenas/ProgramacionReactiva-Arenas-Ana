import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAlumnoComponent } from './components/list-alumno/list-alumno.component';
import { AddEditAlumnoComponent } from './components/add-edit-alumno/add-edit-alumno.component';

const routes: Routes = [
  { path: '', component: ListAlumnoComponent },
  { path: 'add', component: AddEditAlumnoComponent },
  { path: 'edit/:id', component: AddEditAlumnoComponent },
  { path: '**', component: ListAlumnoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
