import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, GuardResult, provideRouter, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { adminGuard } from './admin.guard';

function createRouteSnapshot(): ActivatedRouteSnapshot {
  return new ActivatedRouteSnapshot();
}

function createStateSnapshot(): RouterStateSnapshot {
  return {
    url: '/admin'
  } as RouterStateSnapshot;
}
describe('adminGuard', () => {
  let httpMock: HttpTestingController;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
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

  expect(result).toBeTruthy();
  expect(result.toString()).toContain('/');
});

  it('should redirect if request fails', async () => {
    const route = createRouteSnapshot();
    const state = createStateSnapshot();

    const resultPromise = TestBed.runInInjectionContext(() => {
      const guardResult =
        adminGuard(route, state) as Observable<GuardResult>;

      return firstValueFrom(guardResult);
    });

    const req = httpMock.expectOne('/api/me');

    req.flush('Error', {
      status: 401,
      statusText: 'Unauthorized'
    });

    const result = await resultPromise;

    const expectedUrlTree = router.createUrlTree(['/']);

    expect(result instanceof UrlTree).toBeTrue();
    expect(router.serializeUrl(result as UrlTree))
      .toEqual(router.serializeUrl(expectedUrlTree));
  });
});