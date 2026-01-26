import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home').then(
        m => m.Home
      )
  },
  {
    path: 'bloque-1',
    loadComponent: () =>
      import('./features/block_1/block_1').then(
        m => m.Block1
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