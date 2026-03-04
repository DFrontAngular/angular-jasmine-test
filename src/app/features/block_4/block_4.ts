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
import {
  CanActivateFn,
  Router,
  GuardResult
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

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
`;

  readonly guardTestCode = `
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  GuardResult,
  provideRouter
} from '@angular/router';
import {
  provideHttpClient
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, Observable } from 'rxjs';

describe('adminGuard', () => {
  let httpMock: HttpTestingController;

  function createRouteSnapshot(): ActivatedRouteSnapshot {
    return new ActivatedRouteSnapshot();
  }

  function createStateSnapshot(): RouterStateSnapshot {
    return {
      url: '/admin'
    } as RouterStateSnapshot;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should allow admin user', async () => {
    const route = createRouteSnapshot();
    const state = createStateSnapshot();

    const resultPromise = TestBed.runInInjectionContext(async () => {
      const guardResult =
        adminGuard(route, state) as Observable<GuardResult>;

      return firstValueFrom(guardResult);
    });

    const req = httpMock.expectOne('/api/me');

    req.flush({
      id: 1,
      name: 'John',
      role: 'admin'
    });

    const result = await resultPromise;

    expect(result).toBeTrue();
  });

  it('should redirect if user is not admin', async () => {
    const route = createRouteSnapshot();
    const state = createStateSnapshot();

    const resultPromise = TestBed.runInInjectionContext(async () => {
      const guardResult =
        adminGuard(route, state) as Observable<GuardResult>;

      return firstValueFrom(guardResult);
    });

    const req = httpMock.expectOne('/api/me');

    req.flush({
      id: 2,
      name: 'Jane',
      role: 'user'
    });

    const result = await resultPromise;

    expect(result.toString()).toContain('/');
  });

  it('should redirect on error', async () => {
    const route = createRouteSnapshot();
    const state = createStateSnapshot();

    const resultPromise = TestBed.runInInjectionContext(async () => {
      const guardResult =
        adminGuard(route, state) as Observable<GuardResult>;

      return firstValueFrom(guardResult);
    });

    const req = httpMock.expectOne('/api/me');

    req.error(new ErrorEvent('Network error'));

    const result = await resultPromise;

    expect(result.toString()).toContain('/');
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

  const result = await TestBed.runInInjectionContext(async () => {
    const guardResult =
      adminGuard(route, state) as Observable<GuardResult>;

    return firstValueFrom(guardResult);
  });

  expect(result).toBeTrue();
});
`;
}