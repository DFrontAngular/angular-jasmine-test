import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Form } from './features/form/form';
import { PersonDetail } from './features/person-detail/person-detail';
import { List } from './features/list/list';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'form', component: Form },
  { path: 'list', component: List },
  { path: 'person/:id', component: PersonDetail },
  { path: '**', redirectTo: '' }
];
