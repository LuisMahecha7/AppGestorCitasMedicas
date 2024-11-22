import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Esto es correcto, RouterOutlet es una directiva
import { Router } from '@angular/router'; // Solo se inyecta en el constructor, no en imports
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet], // Solo importas módulos y directivas
  templateUrl: './app.component.html'
})
export class AppComponent {
 
}
