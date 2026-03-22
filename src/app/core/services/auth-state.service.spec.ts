import { firstValueFrom } from 'rxjs';
import { skip } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';

import { AuthStateService } from './auth-state.service';

describe('AuthStateService', () => {
  let service: AuthStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(AuthStateService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should expose false as initial logged state', async () => {
    const result = await firstValueFrom(service.isLogged$);

    expect(result).toBeFalse();
  });

  it('should emit true after setIsLogged(true)', async () => {
    const nextValuePromise = firstValueFrom(service.isLogged$.pipe(skip(1)));

    service.setIsLogged(true);

    const result = await nextValuePromise;

    expect(result).toBeTrue();
  });

  it('should emit false after setIsLogged(false)', async () => {
    service.setIsLogged(true);

    const nextValuePromise = firstValueFrom(service.isLogged$.pipe(skip(1)));

    service.setIsLogged(false);

    const result = await nextValuePromise;

    expect(result).toBeFalse();
  });
});
