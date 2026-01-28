import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createMockUsers } from '../../../testing/user.factory';
import { User, UserService } from './user';


describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    createMockUsers()
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAllUsers', () => {
    it('debería retornar usuarios', () => {
      service.getAllUsers().subscribe(users => {
        expect(users.length).toBe(1);
        expect(users[0].name).toBe('Juan Pérez');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('debería manejar error del servidor', () => {
      service.getAllUsers().subscribe({
        error: (err) => {
          expect(err.message).toBe('Error en la comunicación con el servidor');
        }
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getUserById', () => {
    it('debería retornar un usuario por id', () => {
      service.getUserById(1).subscribe(user => {
        expect(user.id).toBe(1);
        expect(user.name).toBe('Juan Pérez');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers[0]);
    });

    it('debería lanzar error si id <= 0', () => {
      service.getUserById(0).subscribe({
        error: (err) => {
          expect(err.message).toBe('ID debe ser mayor que 0');
        }
      });
    });
  });

  describe('createUser', () => {
    it('debería crear un usuario', () => {
      const newUser = { ...mockUsers[0], id: undefined as any };

      service.createUser(newUser).subscribe(user => {
        expect(user.name).toBe('Juan Pérez');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('POST');
      req.flush(mockUsers[0]);
    });

    it('debería lanzar error si falta name o email', () => {
      service.createUser({ ...mockUsers[0], name: '', email: '' }).subscribe({
        error: (err) => {
          expect(err.message).toBe('Nombre y email son obligatorios');
        }
      });
    });
  });

  describe('updateUser', () => {
    it('debería actualizar un usuario', () => {
      const updatedUser = { ...mockUsers[0], name: 'Nuevo Nombre' };

      service.updateUser(1, updatedUser).subscribe(user => {
        expect(user.name).toBe('Nuevo Nombre');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users/1');
      expect(req.request.method).toBe('PUT');
      req.flush(updatedUser);
    });

    it('debería lanzar error si id <= 0', () => {
      service.updateUser(0, {}).subscribe({
        error: (err) => {
          expect(err.message).toBe('ID debe ser mayor que 0');
        }
      });
    });
  });

  describe('deleteUser', () => {
    it('debería eliminar un usuario', () => {
      service.deleteUser(1).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('debería lanzar error si id <= 0', () => {
      service.deleteUser(0).subscribe({
        error: (err) => {
          expect(err.message).toBe('ID debe ser mayor que 0');
        }
      });
    });
  });

  describe('getUsersByName', () => {
    it('debería filtrar usuarios por nombre', () => {
      service.getUsersByName('juan').subscribe(users => {
        expect(users.length).toBe(1);
        expect(users[0].name).toContain('Juan');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
    });

    it('debería lanzar error si el nombre está vacío', () => {
      service.getUsersByName(' ').subscribe({
        error: (err) => {
          expect(err.message).toBe('El nombre no puede estar vacío');
        }
      });
    });
  });
});
