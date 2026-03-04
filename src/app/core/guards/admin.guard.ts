import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  CanActivateFn,
  GuardResult,
  Router
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

export const adminGuard: CanActivateFn = (): Observable<GuardResult> => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get<User>('/api/me').pipe(
    map(user =>
      user.role === 'admin'
        ? true
        : router.createUrlTree(['/'])
    ),
    catchError(() =>
      of(router.createUrlTree(['/']))
    )
  );
};
