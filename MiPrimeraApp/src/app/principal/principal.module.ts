import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPrincipalComponent } from './components/index-principal/index-principal.component';
import { LoginPacienteComponent } from './components/login-paciente/login-paciente.component';
import { LoginMedicoComponent } from './components/login-medico/login-medico.component';
import { RegistrarPacienteComponent } from './components/registrar-paciente/registrar-paciente.component';
import { RegistrarMedicoComponent } from './components/registrar-medico/registrar-medico.component';
import { PrincipalRoutingModule } from './principal-routing-module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    IndexPrincipalComponent,
    LoginPacienteComponent,
    LoginMedicoComponent,
    RegistrarMedicoComponent,
    RegistrarPacienteComponent // Solo importa MedicoRoutingModule aquí
  ]
})
export class PrincipalModule { }
