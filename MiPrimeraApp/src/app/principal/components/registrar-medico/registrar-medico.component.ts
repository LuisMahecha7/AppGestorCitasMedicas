import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-medico',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './registrar-medico.component.html',
  styleUrl: './registrar-medico.component.scss'
})
export class RegistrarMedicoComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null; // Nueva variable para el mensaje de éxito
  submitted = false;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    // Crear formulario con validación de las entradas de información.
    this.registerForm = this.fb.group({
      nombres: ['', [Validators.required]],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', [Validators.required]],
      especialidad: ['', Validators.required],
      //Valida caracteristicas de celular, correo, contraseña, con expresiones regulares
      celular: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required ,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }

  onSubmit(isRegister: boolean) {
    // Eventos del botón registrar
    this.errorMessage = null;
    this.submitted = true;
    // Ejecuta la función que valida y envia datos, al backend
    if (this.registerForm.invalid) {
      this.errorMessage = 'Error en los campos, valide la información', this.errorMessage;
      return;
    } else {
      this.register();
    }
  }
  // Función para registrar al Medico, validando el correo en la misma petición
  private register() {
    const { nombres, primerApellido, segundoApellido, especialidad, celular, direccion, email, password } = this.registerForm.value;

    const requestData = {
      nombres, primerApellido, segundoApellido, especialidad, celular,
      direccion, email, password, tipoUsuario: 'medico'
    };
    this.http.post('http://localhost/AppGestorCitasMedicas/backphp/index.php',requestData,
      { observe: 'response', headers: { 'Content-Type': 'application/json' } } // Esto incluye los headers en la respuesta
    ).subscribe(
      (response) => {
        // Manejo de la respuesta JSON
        const responseBody: any = response.body;
        if (response.status === 201 && responseBody.status === 'success') {
          // Registro exitoso
          this.successMessage = responseBody.message || 'Registro exitoso.';
          setTimeout(() => {
            this.router.navigate(['principal/login-medico']);
          }, 3000);
        }
      },
      (error) => {
        console.error('Error al registrar al paciente:', error);

        if (error.status === 400 && error.error?.status === 'email_exists') {
          // Caso donde el correo ya está registrado
          this.errorMessage = error.error?.message || 'Correo existente en la base de datos';
        } else {
          // Otros errores genéricos
          this.errorMessage = error.error?.message || 'Ocurrió un error al procesar su solicitud. Intente nuevamente.';
        }
      }
    );
  }
}