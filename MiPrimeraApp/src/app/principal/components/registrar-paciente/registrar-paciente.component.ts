import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.scss'
})
export class RegistrarPacienteComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
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
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
  }

  
  
  onSubmit(isRegister: boolean) {
    //Eventos del boton registrar
    this.errorMessage = null;
    this.submitted = true;
    //Ejecuta la funcion para validar y enviar los datos al backend
    if(this.registerForm.invalid){

      this.errorMessage = "Error en los campos, valide la información";
      return;
    }
    else{
      this.register()
    }
    
  }

  //Funcion para enviar los datos al backend
  private registerPaciente(nombres: string, primerApellido: string, segundoApellido: string, tipoDocumento: string, numDocumento: string,celular:string, email: string, password: string) {
    // Enviar los datos al backend para registrar al médico
    this.http.post('http://localhost/tu-backend/register-paciente.php', {
      nombres, primerApellido, segundoApellido, tipoDocumento,numDocumento, celular, email, password
    }).subscribe(
      (response: any) => {
        if (response.status === 'exito') {
          // Si el registro es exitoso, redirigir a la página de inicio
          alert("Registro Valido")
          this.router.navigate(['/login-medico']);
        } else {
          // Si ocurre algún otro error
          this.errorMessage = 'Hubo un problema al registrar al médico. Por favor intente nuevamente.';
        }
      },
      error => {
        this.errorMessage = 'Hubo un error al intentar registrar al médico, por favor intente nuevamente.';
      }
    );
  }

  //Funcion para validar que el correo no exista en la Bd y despues registre al medico.
  private register() {
    //Se extraen los valores de las entradas de datos
    const {nombres} = this.registerForm.value;
    const {primerApellido} = this.registerForm.value;
    const {segundoApellido} = this.registerForm.value;
    const {tipoDocumento} = this.registerForm.value;
    const {numDocumento} = this.registerForm.value;
    const {celular} = this.registerForm.value;
    const {email} = this.registerForm.value;
    const {password} = this.registerForm.value;

      if(this.registerForm.valid){
        this.http.post('http://localhost/tu-backend/check-email.php', { email })
      .subscribe(
        (response: any) => {
          if (response.status === 'email_exists') {
            // Si el correo ya está registrado
            this.errorMessage = 'El correo electrónico ya está registrado. Por favor use otro.';
          } else if (response.status === 'email_available') {
            // Si el correo está disponible, proceder con el registro del médico
            this.registerPaciente(nombres, primerApellido, segundoApellido, tipoDocumento, numDocumento, celular, email, password);
          }
        },
        error => {
          this.errorMessage = 'Hubo un error al verificar el correo electrónico, por favor intente nuevamente.';
        }
      );
    } 
      else {
      console.log("Error");
      }
  }
}
