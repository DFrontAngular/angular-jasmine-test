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

function createRouteSnapshot(): ActivatedRouteSnapshot {
  return new ActivatedRouteSnapshot();
}

function createStateSnapshot(): RouterStateSnapshot {
  return {
    url: '/admin'
  } as RouterStateSnapshot;
}
describe('adminGuard', () => {
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
