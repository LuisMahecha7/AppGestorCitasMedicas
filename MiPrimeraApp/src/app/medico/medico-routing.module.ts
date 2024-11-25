import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexMedicoComponent } from './components/index-medico/index-medico.component';
import { CitaMedicaComponent } from './components/cita-medica/cita-medica.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';

const routes: Routes = [
  {
    path: '',
    component: IndexMedicoComponent, // Componente principal que tiene el <router-outlet>
    children: [
      { path: 'cita-medica', component: CitaMedicaComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'cuenta', component: CuentaComponent },
      { path: '', redirectTo: '', pathMatch: 'full' } // Ruta hija predeterminada
    ]
  },
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' } // Redirigir a 'principal' como la ruta principal predeterminada
];
@NgModule({
  imports: [RouterModule.forChild(routes)], // No necesitas declarar el componente aquí
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
