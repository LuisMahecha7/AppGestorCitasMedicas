import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPacientesComponent } from './components/index-pacientes/index-pacientes.component';
import { CitaMedicaComponent } from './components/cita-medica/cita-medica.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';



const routes: Routes = [
  { path: '', component: IndexPacientesComponent }, // Ruta principal del módulo Medico
  { path: 'cita-medica', component: CitaMedicaComponent },
  { path: 'cuenta', component: CuentaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // No necesitas declarar el componente aquí
  exports: [RouterModule]
})
export class PacientesRoutingModule { }