import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Esto es correcto, RouterOutlet es una directiva
import { Router } from '@angular/router'; // Solo se inyecta en el constructor, no en imports
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index-principal',
  standalone: true,
  imports: [CommonModule,RouterOutlet,FormsModule],
  templateUrl: './index-principal.component.html',
  styleUrl: './index-principal.component.scss'
})
export class IndexPrincipalComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  mostrarTipoInicio = false;
  tipoUsuario: string | null = null;

  constructor(private router: Router) {}

  // Método para alternar la caja según el tipo de usuario
  toggleTipoInicio(tipo: string) {
    if (this.tipoUsuario === tipo) {
      this.mostrarTipoInicio = !this.mostrarTipoInicio;
    } else {
      this.tipoUsuario = tipo;
      this.mostrarTipoInicio = true;
    }
  }

  // Método para redirigir a la página de inicio de sesión
  redireccionarIniciarSesion(event: Event) {
    event.preventDefault(); // Evita que la página se recargue
    if (this.tipoUsuario === 'PACIENTE') {
      this.router.navigate(['principal/login-paciente']); // Cambiar ruta
    } else if (this.tipoUsuario === 'MEDICO') {
      this.router.navigate(['principal/login-medico']); // Cambiar ruta
    }
  }
  //Metodo para redirigir a la pagina de inicio sesión 
  redireccionarRegistro(event: Event) {
    event.preventDefault(); // Evita que la página se recargue
    if (this.tipoUsuario === 'PACIENTE') {
      this.router.navigate(['principal/registrar-paciente']); // Cambiar ruta
    } else if (this.tipoUsuario === 'MEDICO') {
      this.router.navigate(['principal/registrar-medico']); // Cambiar ruta
    }
  }
  
}
