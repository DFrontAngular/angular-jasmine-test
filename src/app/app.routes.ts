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
    path: 'bloque-3',
    loadComponent: () =>
      import('./features/block_3/block_3').then(
        m => m.Block3
      )
  },
  {
    path: 'bloque-4',
    loadComponent: () =>
      import('./features/block_4/block_4').then(
        m => m.block_4
      )
  },
  {
    path: 'bloque-5',
    loadComponent: () =>
      import('./features/block_5/block_5').then(
        m => m.block_5
      )
  },
  {
    path: 'bloque-6',
    loadComponent: () =>
      import('./features/block_6/block_6').then(
        m => m.block_6
      )
  },
  {
    path: 'bloque-7',
    loadComponent: () =>
      import('./features/block_7/block_7').then(
        m => m.block_7
      )
  },
   {
    path: 'bloque-final',
    // canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/block_final/block_final').then(
        m => m.block_final
      )
  },
  {
    path: '**',
    redirectTo: 'theory'
  }
];