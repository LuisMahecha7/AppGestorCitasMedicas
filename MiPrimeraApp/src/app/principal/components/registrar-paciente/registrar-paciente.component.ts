import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.scss',
})
export class RegistrarPacienteComponent {
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
      tipoDocumento: ['', Validators.required],
      numDocumento: ['', Validators.required],
      //Valida las caracteristicas del celular con expresiones regulares
      celular: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
      //Valida las caracteristicas del correo con expresiones regulares
      email: ['', [Validators.required ,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      //Valida las caracteristicas de la contraseña con expresiones regulares
      //password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(isRegister: boolean) {
    // Eventos del botón registrar
    this.errorMessage = null;
    this.submitted = true;
    // Ejecuta la función para validar y enviar los datos al backend
    if (this.registerForm.invalid) {
      this.errorMessage = 'Error en los campos, valide la información', this.errorMessage;
      return;
    } else {
      this.register();
    }
  }
  // Función para registrar al paciente, validando el correo en la misma petición
  private register() {
    const { nombres, primerApellido, segundoApellido, tipoDocumento, numDocumento, celular, email, password } = this.registerForm.value;

    this.http.post('http://localhost/PGestorCMedicas/backphp/index.php',
      { nombres, primerApellido, segundoApellido, tipoDocumento, numDocumento, celular, email, password },
      { observe: 'response' } // Esto incluye los headers en la respuesta
    ).subscribe(
      (response) => {
        // Mostrar los valores de los encabezados en consola
        console.log('Encabezados de la respuesta:', response.headers.keys());
        console.log('Content-Type:', response.headers.get('Content-Type'));
        console.log('Status Code:', response.status);

        // Manejo de la respuesta en JSON
        const responseBody: any = response.body;
        console.log('Respuesta del servidor:', responseBody);

        if (response.status === 201 && responseBody.status === 'success') {
          // Registro exitoso
          this.successMessage = responseBody.message || 'Registro exitoso.';
          setTimeout(() => {
            this.router.navigate(['principal/login-paciente']);
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
          this.errorMessage = error.error?.message || 'Ocurrió un error al procesar su solicitud. Intente nuevamentii.';
        }

        // Mostrar el mensaje de error al usuario-debug
        //alert(this.errorMessage);
      }
    );
  }
}
