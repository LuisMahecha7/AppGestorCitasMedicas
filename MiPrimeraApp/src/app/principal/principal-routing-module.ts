import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPrincipalComponent } from './components/index-principal/index-principal.component';
import { LoginMedicoComponent } from './components/login-medico/login-medico.component';
import { LoginPacienteComponent } from './components/login-paciente/login-paciente.component';
import { RegistrarMedicoComponent } from './components/registrar-medico/registrar-medico.component';
import { RegistrarPacienteComponent } from './components/registrar-paciente/registrar-paciente.component';


const routes: Routes = [
  {
    path: 'principal',
    component: IndexPrincipalComponent, // Componente principal que tiene el <router-outlet>
    children: [
      { path: 'login-medico', component: LoginMedicoComponent },
      { path: 'login-paciente', component: LoginPacienteComponent },
      { path: 'registrar-medico', component: RegistrarMedicoComponent },
      { path: 'registrar-paciente', component: RegistrarPacienteComponent },
      { path: '', redirectTo: '', pathMatch: 'full' } // Ruta hija predeterminada
    ]
  },
  { path: '', redirectTo: 'principal', pathMatch: 'full' } // Redirigir a 'principal' como la ruta principal predeterminada
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }