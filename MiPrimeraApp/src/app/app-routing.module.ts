// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa el módulo Medico
import { MedicoModule } from './medico/medico.module';
import { PrincipalModule } from './principal/principal.module';

const routes: Routes = [
  // Redirige al módulo Medico
  { path: 'principal', loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule) },

  // Ruta predeterminada que podría llevar a otra página si no es médico
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

