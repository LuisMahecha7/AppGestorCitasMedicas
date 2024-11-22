import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.scss'
})
export class RegistrarPacienteComponent {
  nombres: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  tipoDocumento: string = '';
  numDocumento: string = '';
  celular: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  onSubmit(isRegister: boolean) {
    // Reset error message before submission
    this.errorMessage = null;

    if (isRegister) {
      this.register();
    } else {
      this.login();
    }
  }

  private login() {

  }

  private register() {
    this.router.navigate(['/registrar-paciente']); // Redirigir a la página de éxito de registro o similar
  }
}
