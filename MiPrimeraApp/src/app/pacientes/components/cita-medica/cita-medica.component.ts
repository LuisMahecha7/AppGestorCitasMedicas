import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,FormGroup,FormBuilder, Validators ,AbstractControl, ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cita-medica',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './cita-medica.component.html',
  styleUrl: './cita-medica.component.scss'
})
export class CitaMedicaComponent {
  agendarCitaForm: FormGroup;
  buttonMod = true;
  buttonAct = true;
  errorMessage: string | null = null;
  errorMessageDocumento: string | null = null
  submitted = false;
  emailDisabled: boolean = true;
  passwordDisabled: boolean = true;
  activarMotivoConsulta: any;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {

    // Crear formulario con validación de las entradas de información.
    this.agendarCitaForm = this.fb.group({
      especialidad: ['', [Validators.required]],
      motivoCita: ['', Validators.required],
      descripcionMotivo: ['', Validators.required],
      horaCita: ['', [Validators.required]],
      fechaCita: ['', Validators.required],
      medico: ['', Validators.required],
    });
  }
  
  //Funcion para para traer al paciente que inicio sesión.
  private traerPaciente(){

    //Petición para traer al paciente

    let paciente = {
        nombres: "Cristian",
        primerApellido: "Forero",
        segundoApellido: "Zamora",
        tipoDocumento: "TC",
        numeroDocumento: "",
        numeroCelular: ""
    }

    return paciente;
  }

  //Funcion para enviar los datos al backend
  private registerPaciente() {
    // Enviar los datos al backend para modificar al paciente
    //const {Paciente} = this.traerPaciente()
    const {especialidad} = this.agendarCitaForm.value;
    const {motivoCita} = this.agendarCitaForm.value;
    const {descripcionMotivo} = this.agendarCitaForm.value;
    const {horaCita} = this.agendarCitaForm.value;
    const {fechaCita} = this.agendarCitaForm.value;
    const {Medico} = this.agendarCitaForm.value;
  
    this.http.post('http://localhost/tu-backend/cita-Medica.php', {
      especialidad, motivoCita,descripcionMotivo, horaCita,fechaCita, Medico
    }).subscribe(
      (response: any) => {
        if (response.status === 'exito') {
          alert("Registro Valido")
        } else {
          // Si ocurre algún otro error
          this.errorMessage = 'Hubo un problema al registrar la cita. Por favor intente nuevamente.';
        }
      },
      error => {
        this.errorMessage = 'Hubo un error al intentar registrar la cita, por favor intente nuevamente.';
      }
    );
  }
}

