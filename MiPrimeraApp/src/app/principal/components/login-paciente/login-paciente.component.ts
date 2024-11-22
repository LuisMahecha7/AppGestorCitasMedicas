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
  submitted = false;

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) {
    // Crear formulario con validación de correo y contraseña
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]], // Validación del correo electrónico
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

  // Método para manejar el inicio de sesión
  private login() {
    //Se extren los datos de las entradas de datos.
    const { username, password } = this.loginForm.value;

    // Realizar la solicitud HTTP al backend PHP
    this.http.post('http://localhost/tu-backend/login.php', { username, password })
      .subscribe(
        (response: any) => {
          if (response.status === 'usuario_no_registrado') {
            // Si el usuario no está registrado, preguntar si desea registrarse
            if (confirm('El usuario no está registrado. ¿Deseas registrarlo?')) {
              this.router.navigate(['principal/registrar-paciente']); // Redirigir a la página de registro
            }
          } else if (response.status === 'credenciales_incorrectas') {
            // Si la contraseña o el correo son incorrectos
            this.errorMessage = 'Correo electrónico o contraseña incorrectos';
          } else if (response.status === 'exito') {
            // Si el inicio de sesión es exitoso
            this.router.navigate(['principal/index-paciente']); // Redirigir a la página principal
          }
        },
        error => {
          this.errorMessage = 'Hubo un error al intentar iniciar sesión, por favor intente nuevamente.';
        }
      );
  }

  // Método para registrar a un nuevo médico
  private register() {
    this.router.navigate(['principal/registrar-paciente']); // Redirigir a la página de registro
  }
}