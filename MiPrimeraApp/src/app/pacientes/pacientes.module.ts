import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPacientesComponent } from './components/index-pacientes/index-pacientes.component';
import { PacientesRoutingModule } from './pacientes-routing.module';

@NgModule({
  declarations: [IndexPacientesComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule  // Solo importa MedicoRoutingModule aquí
  ]
})
export class PacientesModule { }