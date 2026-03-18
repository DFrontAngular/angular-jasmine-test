import { inject } from '@angular/core';
import { CanActivateFn, GuardResult, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';

export const adminGuard: CanActivateFn = (): Observable<GuardResult> => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  return authStateService.isLogged$.pipe(
    take(1),
    map((isLogged) => (isLogged ? true : router.createUrlTree(['/'])))
  );
};
