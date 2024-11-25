import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-pacientes',
  templateUrl: './index-pacientes.component.html',
  styleUrls: ['./index-pacientes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexPacientesComponent {
  mostrarContCitaMedica = false;
  constructor(private router: Router) {}

  redireccionarCita(event: Event) {
    
    event.preventDefault(); // Evita que la página se recargue
      this.mostrarContCitaMedica = true;
      this.router.navigate(['pacientes/cita-medica']);
  }
  redireccionarCuenta(event: Event) {
    this.mostrarContCitaMedica = false
    event.preventDefault(); // Evita que la página se recargue
      this.router.navigate(['pacientes/cuenta']);
  }

 }