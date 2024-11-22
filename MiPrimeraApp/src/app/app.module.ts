import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { appRoutes } from './app.routes';  // Importa las rutas

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),  // Configura las rutas
  ],
  providers: [],
  bootstrap: []  // Deberás indicar aquí el componente raíz correcto
})
export class AppModule { }

