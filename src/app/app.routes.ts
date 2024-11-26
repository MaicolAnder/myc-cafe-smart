import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cultivo',
    loadComponent: () => import('./features/cultivo/cultivo.component').then(m => m.CultivoComponent)
  },
  {
    path: 'procesos',
    loadComponent: () => import('./features/procesos/procesos.component').then(m => m.ProcesosComponent)
  },
  {
    path: 'empaque',
    loadComponent: () => import('./features/empaque/empaque.component').then(m => m.EmpaqueComponent)
  },
  {
    path: 'historial',
    loadComponent: () => import('./features/historial/historial.component').then(m => m.HistorialComponent)
  },
  {
    path: '',
    redirectTo: '/cultivo',
    pathMatch: 'full'
  }
];