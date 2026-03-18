import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private readonly isLoggedSubject = new BehaviorSubject<boolean>(false);

  readonly isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  setIsLogged(isLogged: boolean): void {
    this.isLoggedSubject.next(isLogged);
  }
}
