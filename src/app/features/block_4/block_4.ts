import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block_4.html',
  styleUrl: './block_4.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class block_4 {
  readonly guardCode = `
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
`;

  readonly guardTestCode = `
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
  function createRouteSnapshot(): ActivatedRouteSnapshot {
    return new ActivatedRouteSnapshot();
  }

  function createStateSnapshot(): RouterStateSnapshot {
    return {
      url: '/admin'
    } as RouterStateSnapshot;
  }

  let router: Router;
  let isLoggedSubject: BehaviorSubject<boolean>;

  beforeEach(() => {
    isLoggedSubject = new BehaviorSubject<boolean>(false);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthStateService,
          useValue: {
            isLogged$: isLoggedSubject.asObservable()
          }
        }
      ]
    });

    router = TestBed.inject(Router);
  });

  it('should allow logged user', async () => {
    const route = createRouteSnapshot();
    const state = createStateSnapshot();

    isLoggedSubject.next(true);

    const resultPromise = TestBed.runInInjectionContext(async () => {
      const guardResult =
        adminGuard(route, state) as Observable<GuardResult>;

      return firstValueFrom(guardResult);
    });

    const result = await resultPromise;

    expect(result).toBeTrue();
  });

  it('should redirect if user is not logged', async () => {
    const route = createRouteSnapshot();
    const state = createStateSnapshot();

    const resultPromise = TestBed.runInInjectionContext(async () => {
      const guardResult =
        adminGuard(route, state) as Observable<GuardResult>;

      return firstValueFrom(guardResult);
    });

    const result = await resultPromise;
    const expectedUrlTree = router.createUrlTree(['/']);

    expect(result instanceof UrlTree).toBeTrue();
    expect(router.serializeUrl(result as UrlTree))
      .toEqual(router.serializeUrl(expectedUrlTree));
  });
});
`;

  readonly routesCode = `
import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/home/home')
        .then(m => m.Home)
  },
  {
    path: 'bloque-1',
    loadComponent: () =>
      import('./features/block_1/block_1')
        .then(m => m.Block1)
  }
];
`;

  readonly routingTestCode = `
import { RouterTestingHarness } from '@angular/router/testing';

describe('App routing', () => {
  it('should navigate to home page', async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(appRoutes)]
    }).compileComponents();

    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/home');

    const title = harness.routeNativeElement
      ?.querySelector('[data-testid="home-title"]');

    expect(title).not.toBeNull();
  });
});
`;

readonly injectionContextExample = `
it('should execute guard inside injection context', async () => {
  const route = new ActivatedRouteSnapshot();

  const state: RouterStateSnapshot = {
    url: '/admin'
  } as RouterStateSnapshot;

  isLoggedSubject.next(true);

  const result = await TestBed.runInInjectionContext(async () => {
    const guardResult =
      adminGuard(route, state) as Observable<GuardResult>;

    return firstValueFrom(guardResult);
  });

  expect(result).toBeTrue();
});
`;
}
