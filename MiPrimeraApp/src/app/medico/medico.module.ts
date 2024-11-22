import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexMedicoComponent } from './components/index-medico/index-medico.component';
import { MedicoRoutingModule } from './medico-routing.module';

@NgModule({
  declarations: [IndexMedicoComponent],
  imports: [
    CommonModule,
    MedicoRoutingModule  // Solo importa MedicoRoutingModule aquí
  ]
})
export class MedicoModule { }
