import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,FormGroup,FormBuilder, Validators ,AbstractControl, ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule,ReactiveFormsModule],
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
      tipoDocumento: ['', Validators.required],
      numDocumento: ['', Validators.required],
      //Valida las caracteristicas del celular con expresiones regulares
      celular: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
      //Valida las caracteristicas del correo con expresiones regulares
      email: [{value: 'cristianjavirs4@gmail.com', disabled: true}, [Validators.required ,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      //Valida las caracteristicas de la contraseña con expresiones regulares
      password: [{value: 'hola', disabled: true}, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
  }
  
  toggleTipoBoton(tipo: string) {

    this.errorMessage = null;
    this.submitted = true;
  
    if(tipo == "actualizar"){
      /*if (this.registerForm.invalid) {
        this.errorMessage = 'Error en los campos, valide la información.';
        return;
      }*/
      //this.registerPaciente();
    }else{
      this.registerForm.get('password')?.enable(); // Habilitar el control
    }
  }


  /*
  private validarTipoDocumento(control: AbstractControl): ValidationErrors | null {
    const tipoDocumento = control.get('tipoDocumento')?.value;
    const numDocumento = control.get('numDocumento')?.value;
  
    const regexSoloNumeros = /^\d+$/; // Solo números
  
    if (!tipoDocumento || !numDocumento) {
      return null; // No se valida si no están ambos valores
    }
  
    if (
      ['TC', 'CC', 'CE'].includes(tipoDocumento) &&
      /!regexSoloNumeros.test(numDocumento)
    ) {
      return { documentoInvalido: 'El número de documento debe contener solo números.' };
    }
  
    return null; // Validez correcta
  }*/

  //Funcion para enviar los datos al backend
  private registerPaciente() {
    // Enviar los datos al backend para modificar al paciente
    const {nombres} = this.registerForm.value;
    const {primerApellido} = this.registerForm.value;
    const {segundoApellido} = this.registerForm.value;
    const {tipoDocumento} = this.registerForm.value;
    const {numDocumento} = this.registerForm.value;
    const {celular} = this.registerForm.value;
    const {email} = this.registerForm.value;
    const {password} = this.registerForm.value;
  
    this.http.post('http://localhost/tu-backend/modificar-paciente.php', {
      nombres, primerApellido, segundoApellido, tipoDocumento,numDocumento, celular, email, password
    }).subscribe(
      (response: any) => {
        if (response.status === 'exito') {
          alert("Registro Valido")
        } else {
          // Si ocurre algún otro error
          this.errorMessage = 'Hubo un problema al registrar al paciente. Por favor intente nuevamente.';
        }
      },
      error => {
        this.errorMessage = 'Hubo un error al intentar registrar al paciente, por favor intente nuevamente.';
      }
    );
  }
}

