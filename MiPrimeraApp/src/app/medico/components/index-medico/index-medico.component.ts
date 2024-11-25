import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-medico',
  templateUrl: './index-medico.component.html',
  styleUrls: ['./index-medico.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexMedicoComponent {

  constructor(private router: Router) {}

  redireccionarCita(event: Event) {
    event.preventDefault(); // Evita que la página se recargue
      this.router.navigate(['medico/cita-medica']);
  }
  redireccionarPaciente(event: Event) {
    event.preventDefault(); // Evita que la página se recargue
      this.router.navigate(['medico/pacientes']);
  }
  redireccionarReportes(event: Event) {
    event.preventDefault(); // Evita que la página se recargue
      this.router.navigate(['medico/reportes']);
  }
  redireccionarCuenta(event: Event) {
    event.preventDefault(); // Evita que la página se recargue
      this.router.navigate(['medico/cuenta']);
  }

 }
