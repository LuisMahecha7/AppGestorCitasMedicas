import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-paciente',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './login-paciente.component.html',
  styleUrl: './login-paciente.component.scss'
})
export class LoginPacienteComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) {
    // Crear formulario con validación de correo y contraseña
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], // Validación del correo electrónico
      password: ['', Validators.required] // Validación de la contraseña
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(isRegister: boolean) {
    this.errorMessage = null; // Resetear el mensaje de error

    if (isRegister) {
      this.register(); // Llamar al método de registro si el parámetro es verdadero
    } else {
      this.login(); // Llamar al método de inicio de sesión
    }
  }

  // Método para manejar el inicio de sesión
  private login() {
    const { username, password } = this.loginForm.value;

    // Validación del correo electrónico (aunque se valida con Validators.email en el formulario, la validación es explícita aquí)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(username)) {
      this.errorMessage = 'Por favor, ingrese un correo electrónico válido.';
      return;
    }

    // Realizar la solicitud HTTP al backend PHP
    this.http.post('http://localhost/tu-backend/login.php', { username, password })
      .subscribe(
        (response: any) => {
          if (response.status === 'usuario_no_registrado') {
            // Si el usuario no está registrado, preguntar si desea registrarse
            if (confirm('El usuario no está registrado. ¿Deseas registrarlo?')) {
              this.router.navigate(['/registrar-paciente']); // Redirigir a la página de registro
            }
          } else if (response.status === 'credenciales_incorrectas') {
            // Si la contraseña o el correo son incorrectos
            this.errorMessage = 'Correo electrónico o contraseña incorrectos';
          } else if (response.status === 'exito') {
            // Si el inicio de sesión es exitoso
            this.router.navigate(['/index-paciente']); // Redirigir a la página principal
          }
        },
        error => {
          this.errorMessage = 'Hubo un error al intentar iniciar sesión, por favor intente nuevamente.';
        }
      );
  }

  // Método para registrar a un nuevo médico
  private register() {
    this.router.navigate(['/registrar-paciente']); // Redirigir a la página de registro
  }
}