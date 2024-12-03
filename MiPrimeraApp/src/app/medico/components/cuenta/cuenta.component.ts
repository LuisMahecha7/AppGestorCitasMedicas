import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})
export class CuentaComponent {
  registerForm: FormGroup;
  buttonMod = true;
  buttonAct = true;
  errorMessage: string | null = null;
  errorMessageDocumento: string | null = null
  submitted = false;
  emailDisabled: boolean = true;
  passwordDisabled: boolean = true;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {

    // Crear formulario con validación de las entradas de información.
    this.registerForm = this.fb.group({
      nombres: ['', [Validators.required]],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', [Validators.required]],
      especialidad: ['', Validators.required],
      //Valida las caracteristicas del celular, email, password con expresiones regulares
      celular: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required ,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });

    // Se llama la función modificarMedico al inicializar el componente
    this.modificarMedico();
  }

  toggleTipoBoton(tipo: string) {

    this.errorMessage = null;
    this.submitted = true;

    if (tipo == "actualizar") {
      /*if (this.registerForm.invalid) {
        this.errorMessage = 'Error en los campos, valide la información.';
        return;
      }*/
      //this.modificarMedico();
    } else {
      this.registerForm.get('password')?.enable(); // Habilitar el control
    }
  }

  //se recupera id guardado en inicio de sesión en localstorage
  private modificarMedico() {
    // Verificar que localStorage esté disponible antes de usarlo
    if (typeof window === 'undefined' || !window.localStorage) {
      console.error('localStorage no está disponible en este entorno.');
      return;
    }

    const storedId = localStorage.getItem('userId');
    const tipoUsuario = 'medico';

    if (!storedId) {
      console.error('No se encontró un ID en localStorage.');
      return;
    }
    const url = `http://localhost/AppGestorCitasMedicas/backphp/index.php?id=${storedId}&tipoUsuario=${tipoUsuario}`;
  
    this.http.get(url, { observe: 'response' as 'body' }).subscribe(
      (response: any) => {
        if (response) {
          // completa el formulario con los datos recibidos en la petición+
          this.registerForm.patchValue({
            nombres: response.body?.nombres || '',
            primerApellido: response.body?.primerApellido || '',
            segundoApellido: response.body?.segundoApellido || '',
            especialidad: response.body?.especialidad || '',
            celular: response.body?.celular || '',
            direccion: response.body?.direccion || '',
            email: response.body?.email || '',
            password: '' //Por seguridad, dejar el campo de contraseña vacío (Validarlo para implementar)
          });
        } else {
          console.error('El servidor devolvió una respuesta vacía o no válida.');
        }
      },
      error => {
        console.error('Error en la solicitud:', error);
        this.errorMessage = 'Hubo un error al intentar modificar al médico, por favor intente nuevamente.';
      }
    );
  }
}
