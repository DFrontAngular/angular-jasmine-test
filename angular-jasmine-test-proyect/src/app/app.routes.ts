import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bloque-1'
  },
  {
    path: 'bloque-1',
    loadComponent: () =>
      import('./features/home/home').then(
        m => m.Home
      )
  },
  {
    path: 'bloque-2',
    loadComponent: () =>
      import('./features/block_2/block_2').then(
        m => m.Block2
      )
  },
  {
    path: '**',
    redirectTo: 'theory'
  }
];