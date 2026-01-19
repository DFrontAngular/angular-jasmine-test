import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com';
  readonly #http = inject(HttpClient)

  constructor() { }

  getAllUsers(): Observable<User[]> {
    return this.#http.get<User[]>(`${this.API_URL}/users`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserById(id: number): Observable<User> {
    if (id <= 0) {
      return throwError(() => new Error('ID debe ser mayor que 0'));
    }

    return this.#http.get<User>(`${this.API_URL}/users/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    if (!user.name || !user.email) {
      return throwError(() => new Error('Nombre y email son obligatorios'));
    }

    return this.#http.post<User>(`${this.API_URL}/users`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    if (id <= 0) {
      return throwError(() => new Error('ID debe ser mayor que 0'));
    }

    return this.#http.put<User>(`${this.API_URL}/users/${id}`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(id: number): Observable<any> {
    if (id <= 0) {
      return throwError(() => new Error('ID debe ser mayor que 0'));
    }

    return this.#http.delete(`${this.API_URL}/users/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsersByName(name: string): Observable<User[]> {
    if (!name.trim()) {
      return throwError(() => new Error('El nombre no puede estar vacío'));
    }

    return this.getAllUsers().pipe(
      map(users => users.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase())
      ))
    );
  }

  private handleError(error: any) {
    console.error('Error en UserService:', error);
    return throwError(() => new Error('Error en la comunicación con el servidor'));
  }
}