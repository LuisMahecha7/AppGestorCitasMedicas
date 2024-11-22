import { Routes } from '@angular/router';
// Define las rutas
export const appRoutes: Routes = [
  { path: '', redirectTo: '/medico', pathMatch: 'full' }, // Ruta predeterminada
  
  {
    path: 'medico',
    loadChildren: () => import('./medico/medico.module').then(m => m.MedicoModule) // Carga diferida para MedicoModule
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule) // Carga diferida para MedicoModule
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule) // Carga diferida para MedicoModule
  },

];
