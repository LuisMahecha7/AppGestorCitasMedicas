import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-medico',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login-medico.component.html',
  styleUrl: './login-medico.component.scss'
})
export class LoginMedicoComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  submitted = false;

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) {
    // Crear formulario con validación de correo y contraseña
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]], // Validación del correo electrónico
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]] // Validación de la contraseña
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(isRegister: boolean) {
    this.errorMessage = null;
    this.submitted = true;
    
    if (isRegister) {
      this.register();
    } else {
      if(this.loginForm.invalid){

        this.errorMessage = "Error en los campos, valide la información";
        return;
      }
      else{
        this.login();
      }
    }
  }

  // Función para manejar el inicio de sesión
  private login() {
    const { email, password } = this.loginForm.value;
    const requestdata = { email, password, tipoUsuario: 'medico', accion: 'login' };

    this.http.post('http://localhost/PGestorCMedicas/backphp/index.php', requestdata,
      { observe: 'response', headers: { 'Content-Type': 'application/json' } }
    ).subscribe(
      (response: any) => {
        const responseBody: any = response.body;
        const id = responseBody.data.id;
        const username = responseBody.data.nombres;

        if (response.status === 200 && response.statusText === 'OK') {
          // Guardar ID del usuario en localStorage
          localStorage.setItem('userId', id.toString());

          this.successMessage = responseBody.mensaje || 'Login satisfactorio.'
          setTimeout(() => {
            this.router.navigate(['medico']);
          }, 3000);
        }
      },
      error => {
        const backendError = error.error || {};
        const backendMessage = backendError.mensaje || backendError.message || 'Error desconocido';

        if (error.status === 404 && error.statusText === 'Not Found') {
          this.errorMessage = backendMessage || 'Correo electrónico no registrado.';
          if (confirm('El usuario no está registrado. ¿Deseas registrarlo?')) {//reemplazar por css y js
            this.router.navigate(['principal/registrar-medico']);
          }
        } else if (error.status === 401 && error.statusText === 'Unauthorized') {
          this.errorMessage = backendMessage || 'Contraseña incorrecta.';
        } else {
          this.errorMessage = backendMessage || 'Ocurrió un error al procesar su solicitud. Intente nuevamente.';
        }
      }
    );
  }
  // Método para registrar un nuevo médico
  private register() {
    this.router.navigate(['principal/registrar-medico']); // Redirigir a página de registro
  }
}